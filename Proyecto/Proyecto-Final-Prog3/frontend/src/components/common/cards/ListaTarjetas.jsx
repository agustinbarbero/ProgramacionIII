import TarjetaProducto from './TarjetaProducto';

const ListaTarjetas = ({ productos }) => {
    return (
        <div className='lista-tarjetas' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {productos.map((producto) => (
                <TarjetaProducto key={producto.id} producto={producto} />
            ))}
        </div>
    );
};

export default ListaTarjetas;