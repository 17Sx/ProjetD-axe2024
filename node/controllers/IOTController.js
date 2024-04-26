import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

const GetHouse = (req, res) => {
    const randomIndex = Math.floor(Math.random() * houses.length);
    res.json(houses[randomIndex]);
}


const GetIOTs = (req, res) => {
    prisma.iot.findMany()
    .then((iot) => { res.json(iot); })
    .catch((error) => { res.json(error); });
}

const GetIOT = (req, res) => {
    let id = Number(req.params.id);
    prisma.iot.findUnique({where: {id : id}})
    .then((iot) => { res.json(iot); })
    .catch((error) => { res.json(error); });  
}

const AddIOT = (req, res) => {
    prisma.iOT.create({
        data: { 
            name : req.body.name,
            house : req.body.house,
        }
    }).then(iot => {res.json(iot);
    }).catch(error => {res.json(error); })
}

const UpdateIOT  =  (req, res) => {
    let id = Number(req.params.id);
    let iot = req.body;
    prisma.iot.update({where: {id : id}, data :{name: iot.name,},})
    .then((iot) => { res.json(iot); })
    .catch((error) => { res.json(error); });
}

const DeleteIOT = (req, res) => { 
    let id = Number(req.params.id);
    prisma.iot.delete({where: {id : id}})
    .then((iot) => { res.json(iot); })
    .catch((error) => { res.json(error); });
}

export { GetIOTs, AddIOT , GetIOT , DeleteIOT , UpdateIOT, GetHouse} ;