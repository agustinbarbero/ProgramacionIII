const { Movimiento } = require('../models');

exports.getMovimientos = async () => {
    return Movimiento.findAll();
};

exports.createMovimiento = async (data) => {
    return Movimiento.create({
        productoId: data.productoId,
        cantidad: data.cantidad,
        tipo: data.tipo,
        fechaHora: data.fechaHora
    });
};

exports.updateMovimiento = async (id, data) => {
    const [updated] = await Movimiento.update(
        {
            productoId: data.productoId,
            cantidad: data.cantidad,
            tipo: data.tipo,
            fechaHora: data.fechaHora
        },
        { where: { id } }
    );
    return updated;
};

exports.deleteMovimiento = async (id) => {
    return Movimiento.destroy({ where: { id } });
};

exports.getMovimientoById = async (id) => {
    return Movimiento.findByPk(id);
};