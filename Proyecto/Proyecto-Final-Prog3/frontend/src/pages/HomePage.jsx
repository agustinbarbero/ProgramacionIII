import React from "react";
import { useProductos } from "../hooks/useProductos";
import TarjetaProducto from "../components/common/cards/TarjetaProducto";

export default function HomePage() {
    const { data, isLoading, isError } = useProductos();

    if (isLoading) return <div>Cargando productos...</div>;
    if (isError) return <div>Error al cargar productos</div>;

    const productos = data?.data || data;

    return (
        <div className="cards-container">
            {productos && productos.length > 0 ? (
                productos.map((producto) => (
                    <TarjetaProducto key={producto.id} producto={producto} />
                ))
            ) : (
                <div>No hay productos</div>
            )}
        </div>
    );
}