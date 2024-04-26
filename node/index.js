import express from 'express';
const app = express();
import ip from 'ip';
import cors from 'cors';
import router from './router.js';
const ipAd = ip.address();
import bodyParser from 'body-parser';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import axios from 'axios';


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.get('/', (req, res) => {

    res.send('Noa La Drill');

});

app.listen(3000, () => {

    console.log("Server run: http://" + ipAd+":3000"); 


});

app.get('/agents', (req, res) => {
    res.send([
        'Jett',
        'Raze',
        'Breach',
        'Sova',
        'Killjoy',
        'Reyna',
        'Omen',
        'Brimstone',
        'Phoenix',
        'Sage',
        'Viper',
        'Cypher',
        'Astra', 
        'KAY/O',
        'Skye',
        'Yoru',
        'Chamber',
        'Neon',
        'Fade',
        'Harbor'
    ])
}); 


app.get('/cartess', (req, res) => {
    res.send([
        "Harry Potter",
        "Hermione Granger",
        "Ron Weasley",
        "Albus Dumbledore",
        "Severus Snape",
        "Sirius Black",
        "Rubeus Hagrid",
        "Draco Malfoy",
        "Voldemort",
        "Dobby"
    ]);
});


app.get('/cartes', async (req, res) => {
    try {
        const response = await axios.get('https://hp-api.lainocs.fr/characters/');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('error');
    }
});



