const categoriasModel = require('../models/categoria');

exports.getCategorias = async (req, res) => {
    try {
        const categorias = await categoriasModel.getCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorías', error });
    }
}

exports.createCategoria = async (req, res) => {
    try {
        const nuevaCategoria = await categoriasModel.createCategoria(req.body);
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la categoría', error });
    }
}

exports.updateCategoria = async (req, res) => {
    try{
        const { id } = req.params;
        const categoriaActualizada = await categoriasModel.updateCategoria(id, req.body);
        if (!categoriaActualizada) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la categoría', error });
    }
}

exports.deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoriaBorrada = await categoriasModel.deleteCategoria(id);
        if (!categoriaBorrada) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la categoría', error });
    }
}

exports.getCategoriaById = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await categoriasModel.getCategoriaById(id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la categoría', error });
    }
}