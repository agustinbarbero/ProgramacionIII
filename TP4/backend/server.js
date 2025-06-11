const express = require('express');
const cors = require('cors');
const personasRoute = require('./routes/personaRoutes')

const app = express();
const PORT = 5000;

//Middleware
app.use(cors());
app.use(express.json());

//ruta de ejemplo
app.get('/api/mensaje', (req, res) => {
    res.json({ mensaje: 'Hola desde el backend'});
});
app.use('/api', personasRoute);

//Iniciar el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});