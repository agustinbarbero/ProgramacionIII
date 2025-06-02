
// controladores
const home = async (req, res) => {
    res.render('index', {
        title: 'Mi aplicación Express',
        message: '¡Hola desde el servidor!',
        showFeatures: true,
        features: [
            'Descripción de la característica 1',
            'Descripción de la característica 2',
            'Descripción de la característica 3'

        ]
    });
}
module.exports = {
    home
}



