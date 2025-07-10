import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="home-container">
            <h1 className="home-title">Sistema de Inventario Básico</h1>
            <div className="home-buttons">
                <button onClick={() => navigate('/productos')}>Productos</button>
                <button onClick={() => navigate('/categorias')}>Categorías</button>
                <button onClick={() => navigate('/movimientos')}>Movimientos</button>
            </div>
        </div>
    );
}
export default HomePage;