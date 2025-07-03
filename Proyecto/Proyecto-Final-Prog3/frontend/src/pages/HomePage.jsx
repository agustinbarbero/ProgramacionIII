import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage(){
    const navigate = useNavigate();
    return(
        <div>
        <h1>Bienvenido a tu Tienda Virtual</h1>
        <button onClick={() => navigate('/AgregarProducto')}>Agregar Producto</button>
        <button onClick={() => navigate('/movimientos')}>Ver Movimientos</button>
        <button onClick={() => navigate('/agregar-movimiento')}>Registrar Movimiento</button>
        <button onClick={() => navigate('/crear-categoria')}>Crear Categoría</button>
        </div>
    )
}
export default HomePage;