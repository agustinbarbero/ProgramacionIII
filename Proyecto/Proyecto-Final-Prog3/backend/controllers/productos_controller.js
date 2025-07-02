//const { Producto, Categoria } = require("../models");
const productosModel = require("../models/productos");


exports.getProductos = async (req, res) => {
    try {
        const productos = await productosModel.getProductosModel();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos", error });
    }
};

exports.createProducto = async (req, res) => {


    try {
        const nuevoProducto = await productosModel.create(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto", error });
    }
};

exports.updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const productoActualizado = await productosModel.update(id, req.body);
        if (!productoActualizado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto", error });
    }
};

exports.deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const productoBorrado = await productosModel.deleteProducto(id);
        if (!productoBorrado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error });
    }
};

exports.getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await productosModel.findById(id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error });
    }
};


exports.getProductosByCategoria = async (req, res) => {
    const { categoria } = req.params;
    try {
        const productos = await productosModel.findBycategoria(categoria);
        if (productos.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos en esta categoría" });
        }
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos por categoría", error });
    }
}