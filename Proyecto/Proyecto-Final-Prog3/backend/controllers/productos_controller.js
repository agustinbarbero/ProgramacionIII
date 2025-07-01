const {Producto, Categoria} = require("../models");


exports.getProductos = async (req, res) => {
    try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const where = {};
    if (status) where.status = status;
    
    const offset = (page - 1) * limit;

    const { count, rows: tasks } = await Producto.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
    })
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos", error });
    }
};

exports.createProducto = async (req, res) => {

    const {nombre, stock, categoria, precio } = req.body;
    try{
        const nuevoProducto = new Producto({
            nombre,
            stock,
            categoria,
            precio
        });

        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el producto", error });
    }

};

exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Producto.update(req.body, { where: { id } });
    if (updated) {
      const productoActualizado = await Producto.findByPk(id);
      res.json(productoActualizado);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
};

exports.deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const productoEliminado = await Producto.findByIdAndDelete(id);
        if (!productoEliminado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error });
    }
};

exports.getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(producto);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error });
    }
};


exports.getProductosByCategoria = async (req, res) => {
    const { categoria } = req.params;
    try {
        const productos = await Producto.findAll({
            where: { categoria },
            include: [{ model: Categoria, as: 'categoria' }]
        });
        if (productos.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos en esta categoría" });
        }
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos por categoría", error });
    }
}