const categoriasModel = require('../models/categoria');
const productosModel = require('../models/productos'); // Asegúrate de importar esto

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

        // Verifica si hay productos asociados a la categoría
        const productos = await productosModel.findBycategoria(id);
        if (productos && productos.length > 0) {
            return res.status(400).json({ message: 'No se puede eliminar la categoría porque tiene productos asociados.' });
        }

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