const express = require('express');
const personas = require('../models/Personas')
const router = express.Router();

router.get('/personas', (req, res) => {
    try{
    res.json(personas);
    }catch(err){
        res.status(500).json({ error: 'Error al obtener las personas'});
    }
});

module.exports = router;