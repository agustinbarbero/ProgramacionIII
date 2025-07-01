import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage(){
    const navigate = useNavigate();
    const irAgregarProducto = () => {
        navigate('/AgregarProducto');
    };

    return(
        <div>
        <h1>Bienvenido a tu Tienda Virtual</h1>
        <button onClick={irAgregarProducto}>Agregar Producto</button>
        </div>
    )

};

export default HomePage;