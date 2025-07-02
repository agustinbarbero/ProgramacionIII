//const { Movimiento, Producto } = require('../models');
const movimientosModel = require('../models/movimiento');
const productosModel = require('../models/productos');

exports.getMovimientos = async (req, res) => {
    try {
        const movimientos = await movimientosModel.getMovimientos();
        res.status(200).json(movimientos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los movimientos', error });
    }
}


exports.createMovimiento = async (req, res) => {
    try{
        const { productoId, cantidad, tipo, fechaHora } = req.body;

        // Verificar si el producto existe
        const producto = await productosModel.findById(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Crear el movimiento
        const nuevoMovimiento = await movimientosModel.createMovimiento({
            productoId,
            cantidad,
            tipo,
            fechaHora
        });

        // Actualizar el stock del producto
        if (tipo === 'ingreso') {
            producto.stock += cantidad;
        } else if (tipo === 'venta') {
            if (producto.stock < cantidad) {
                return res.status(400).json({ message: 'Stock insuficiente para la salida' });
            }
            producto.stock -= cantidad;
        }

        await producto.save();

        res.status(201).json(nuevoMovimiento);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el movimiento', error });
    }
}

exports.updateMovimiento = async (req, res) => {
    try{
        const { id } = req.params;
        const { productoId, cantidad, tipo, fechaHora } = req.body;

        // Verificar si el movimiento existe
        const movimiento = await movimientosModel.getMovimientoById(id);
        if (!movimiento) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }

        // Verificar si el producto existe
        const producto = await productosModel.findById(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Actualizar el movimiento
        const movimientoActualizado = await movimientosModel.updateMovimiento(id, {
            productoId,
            cantidad,
            tipo,
            fechaHora
        });

        // Actualizar el stock del producto
        if (movimiento.tipo === 'entrada') {
            producto.stock -= movimiento.cantidad;
        } else if (movimiento.tipo === 'salida') {
            producto.stock += movimiento.cantidad;
        }

        if (tipo === 'entrada') {
            producto.stock += cantidad;
        } else if (tipo === 'salida') {
            if (producto.stock < cantidad) {
                return res.status(400).json({ message: 'Stock insuficiente para la salida' });
            }
            producto.stock -= cantidad;
        }

        await producto.save();

        res.status(200).json(movimientoActualizado);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el movimiento', error });
    }
}

exports.deleteMovimiento = async (req, res) => {
    const { id } = req.params;
    try {
        // Verificar si el movimiento existe
        const movimiento = await movimientosModel.getMovimientoById(id);
        if (!movimiento) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }

        // Eliminar el movimiento
        await movimientosModel.deleteMovimiento(id);

        // Actualizar el stock del producto
        const producto = await productosModel.findById(movimiento.productoId);
        if (movimiento.tipo === 'entrada') {
            producto.stock -= movimiento.cantidad;
        } else if (movimiento.tipo === 'salida') {
            producto.stock += movimiento.cantidad;
        }

        await producto.save();

        res.status(200).json({ message: 'Movimiento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el movimiento', error });
    }
}

exports.getMovimientoById = async (req, res) => {
    const { id } = req.params;
    try {
        const movimiento = await movimientosModel.getMovimientoById(id);
        if (!movimiento) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }
        res.status(200).json(movimiento);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el movimiento', error });
    }
}
