import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();


const signup = async (req, res) => {
    try {
        const { pseudo, email, password,maison } = req.body;
        console.log(password, email)
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword,pseudo,maison);
        const user = await prisma.user.create({
            data: {
                pseudo: pseudo,
                email: email,
                password: hashedPassword,
                maison:maison
            }
        }).then((e) => {
            res.status(201).send({
                message: e
            });
        })
        .catch(err =>{
            res.status(400).send({
                error: err.message
            })
        })
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json(error);
    }
};



const login = async (req, res) => {
    console.log(req.body);
    console.log("login");
    console.log(req.body)
    try {
        const user = await prisma.user.findUnique({ where: { email: req.body.email } });
        if (!user) {
            console.log("aaaaaaaa")
            return res.status(400).json({ error: 'User not found' });
        }
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            return res.status(400).json({ error: 'Password incorrect' });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log(token,'ouai cest greg');
        res.send({ token: token });
    } catch (error) {
        res.status(400).json(error);
    }
};

const changepassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.update({
            where: { email: email },
            data: {
                password: hashedPassword
            }
        });
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
};

export {signup, login, changepassword} ;

