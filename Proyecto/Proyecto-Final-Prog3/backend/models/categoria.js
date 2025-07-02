const { Categoria } = require('../models');

exports.getCategorias = async () => {
    return Categoria.findAll();
};

exports.createCategoria = async (data) => {
    return Categoria.create({ nombre: data.nombre });
};

exports.updateCategoria = async (id, data) => {
    const [updated] = await Categoria.update(
        { nombre: data.nombre },
        { where: { id } }
    );
    return updated;
};

exports.deleteCategoria = async (id) => {
    return Categoria.destroy({ where: { id } });
};

exports.getCategoriaById = async (id) => {
    return Categoria.findByPk(id);
};