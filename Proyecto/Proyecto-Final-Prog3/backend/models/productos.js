const { Producto } = require('../models');

exports.getProductosModel = () => {
    return Producto.findAll();
}

exports.create = async (producto) => {
    const nuevoProducto = await Producto.create({
        nombre: producto.nombre,
        precio: producto.precio,
        stock: producto.stock,
        categoriaId: producto.categoriaId // si corresponde
    });
    return nuevoProducto;
}

exports.update = async (id, producto) => {
    const productoActualizado = await Producto.update({
        nombre: producto.nombre,
        precio: producto.precio,
        stock: producto.stock,
        categoriaId: producto.categoriaId // si corresponde
    }, {
        where: { id }
    });
    return productoActualizado;
}

exports.deleteProducto = async (id) => {
    const productoBorrado = await Producto.destroy({
        where: { id }
    });
    return productoBorrado;
}

exports.findById = async (id) => {
    const producto = await Producto.findByPk(id);
    return producto;
}

exports.findBycategoria = async (categoriaId) => {
    return Producto.findAll({
        where: { categoriaId }
    });
};