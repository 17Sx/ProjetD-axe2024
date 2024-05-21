import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const addFav = async (req, res) => {
    try {
        const { userId } = req.params;
        const { cardId } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const listelikedcard = user.listelikedcard ? JSON.parse(user.listelikedcard) : [];
        listelikedcard.push(cardId);
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(userId),
            },
            data: {
                listelikedcard: JSON.stringify(listelikedcard),
            },
        });
        res.status(200).json(updatedUser.listelikedcard);
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json(error);
    }
};

const getFav = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send('Missing user id');
        }
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user.listelikedcard);
    } catch (error) {
        console.error(error);
        res.status(500).send('error');
    }
};

const deleteFav = async (req, res) => {
    try {
        const { id } = req.params;
        const fav = await prisma.fav.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json(user.listelikedcard);
    } catch (error) {
        console.error(error);
        res.status(500).send('error');
    }
};

export { addFav, getFav, deleteFav};