const  { Categoria } = require('../models/categoria');

exports.createCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevaCategoria = new Categoria({ nombre });
        await nuevaCategoria.save();
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la categoría', error });
    }
}

exports.getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorías', error });
    }
}

exports.getCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findById(id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la categoría', error });
    }
}

exports.updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByIdAndUpdate(id, req.body, { new: true });
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json(categoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByIdAndDelete(id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la categoría', error });
    }
}