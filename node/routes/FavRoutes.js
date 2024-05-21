import express from 'express';
import { addFav, getFav, deleteFav } from '../controllers/FavController.js';
const router = express.Router();

router.post('/addfav/:userId', addFav);
router.get('/getfav/:id', getFav);
router.delete('/deletefav/:id', async (req, res) => {
    const userId = req.params.id;
    const cardId = req.body.cardId;

    try {
        // Supprimez la carte des favoris de l'utilisateur
        await deleteFav(userId, cardId);

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

export default router;