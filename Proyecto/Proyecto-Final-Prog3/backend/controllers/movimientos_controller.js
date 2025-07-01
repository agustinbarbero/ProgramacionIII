const { Movimiento, Producto } = require('../models');

exports.createMovimiento = async (req, res) => {
    try {
        const { productoId, cantidad, tipo, fechaHora } = req.body;

        // Verificar si el producto existe
        const producto = await Producto.findByPk(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Crear el movimiento
        const nuevoMovimiento = new Movimiento({
            productoId,
            cantidad,
            tipo,
            fechaHora
        });

        await nuevoMovimiento.save();

        // Actualizar el stock del producto
        if (tipo === 'entrada') {
            producto.stock += cantidad;
        } else if (tipo === 'salida') {
            if (producto.stock < cantidad) {
                return res.status(400).json({ message: 'Stock insuficiente para la salida' });
            }
            producto.stock -= cantidad;
        }

        await producto.save();

        res.status(201).json(nuevoMovimiento);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el movimiento', error });
    }
}

exports.getMovimientos = async (req, res) => {
    try {
        const movimientos = await Movimiento.findAll({
            include: [{
                model: Producto,
                as: 'producto'
            }]
        });
        res.status(200).json(movimientos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los movimientos', error });
    }
}

exports.getMovimientoById = async (req, res) => {
    try {
        const { id } = req.params;
        const movimiento = await Movimiento.findByPk(id, {
            include: [{
                model: Producto,
                as: 'producto'
            }]
        });
        if (!movimiento) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }
        res.status(200).json(movimiento);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el movimiento', error });
    }
}

exports.updateMovimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const { productoId, cantidad, tipo, fechaHora } = req.body;

        // Verificar si el movimiento existe
        const movimiento = await Movimiento.findByPk(id);
        if (!movimiento) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }

        // Verificar si el producto existe
        const producto = await Producto.findByPk(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Actualizar el movimiento
        movimiento.productoId = productoId;
        movimiento.cantidad = cantidad;
        movimiento.tipo = tipo;
        movimiento.fechaHora = fechaHora;

        await movimiento.save();

        // Actualizar el stock del producto
        if (tipo === 'entrada') {
            producto.stock += cantidad;
        } else if (tipo === 'salida') {
            if (producto.stock < cantidad) {
                return res.status(400).json({ message: 'Stock insuficiente para la salida' });
            }
            producto.stock -= cantidad;
        }
    
        await producto.save();

        res.json(movimiento);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el movimiento', error });
    }
}

exports.deleteMovimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const movimiento = await Movimiento.findByPk(id);
        if (!movimiento) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }

        // Verificar el tipo de movimiento para actualizar el stock del producto
        const producto = await Producto.findByPk(movimiento.productoId);
        if (movimiento.tipo === 'entrada') {
            producto.stock -= movimiento.cantidad;
        } else if (movimiento.tipo === 'salida') {
            producto.stock += movimiento.cantidad;
        }

        await producto.save();
        await movimiento.destroy();

        res.status(200).json({ message: 'Movimiento eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el movimiento', error });
    }
}

