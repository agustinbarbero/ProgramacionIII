const TarjetaProducto = ({ producto }) => {
    return (
        <div className="tarjeta-container">
            <div className="tarjeta-producto">
                <h2>{producto.nombre}</h2>
                <p><strong>Stock:</strong> {producto.stock}</p>
                <p><strong>Precio:</strong> ${producto.precio}</p>
                <p><strong>ID:</strong> {producto.id}</p>
            </div>
        </div>
    );
};

export default TarjetaProducto;