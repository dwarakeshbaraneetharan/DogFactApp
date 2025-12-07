const express = require('express');
const router = express.Router();
const Fact = require('../models/Fact');

router.get('/', async (req, res) => {
    try {
        const facts = await Fact.find();
        res.render('index', { facts });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/save-fact', async (req, res) => {
    try {
        const response = await fetch('https://dogapi.dog/api/v2/facts?limit=1');
        const data = await response.json();
        const dogFact = data.data[0].attributes.body;

        await Fact.create({
            userName: req.body.userName,
            factText: dogFact
        });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/delete-all', async (req, res) => {
    try {
        await Fact.deleteMany({});
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;