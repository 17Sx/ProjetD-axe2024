import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const openPack = async (req, res) => {
    try {
        // Appeler l'API externe pour obtenir les données sur les cartes Harry Potter
        const response = await fetch('https://hp-api.lainocs.fr/characters/');
        const data = await response.json();

        // Simulation de l'ouverture d'un pack
        const packContents = data.slice(0, 3); // Obtenir les trois premières cartes

        // Récupérer l'ID de l'utilisateur à partir du token
        const userId = req.user.id;

        // Enregistrer les cartes dans l'inventaire de l'utilisateur
        const inventoryItems = await Promise.all(packContents.map(async (card) => {
            return await prisma.inventory.create({
                data: {
                    userId: userId,
                    card: card.slug 
                }
            });
        }));

        res.status(200).json({ message: 'Pack ouvert avec succès', inventory: inventoryItems });
    } catch (error) {
        console.error('Erreur lors de l\'ouverture du pack :', error);
        res.status(500).json({ message: 'Erreur lors de l\'ouverture du pack' });
    }
};

export { openPack };
