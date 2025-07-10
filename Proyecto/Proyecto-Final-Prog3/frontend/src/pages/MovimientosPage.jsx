import { useNavigate } from "react-router-dom";
import { useMovimientos, useCrearMovimiento } from "../hooks/useMovimiento";
import { useProductos } from "../hooks/useProductos";
import { useState } from "react";
import '../styles/MovimientosPage.css';


function MovimientosPage() {
    const { data, isLoading } = useMovimientos();
    const { data: productos } = useProductos();
    const crearMovimiento = useCrearMovimiento();
    const [form, setForm] = useState({
        productoId: "",
        tipo: "ingreso",
        cantidad: 1,
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        crearMovimiento.mutate(
            { ...form, cantidad: Number(form.cantidad) },
            {
                onSuccess: () => {
                    alert("Movimiento registrado");
                    setForm({ productoId: "", tipo: "ingreso", cantidad: 1 });
                },
                onError: (error) => {
                    const msg = error.response?.data?.message || error.message;
                    alert("Error: " + msg);
                }
            }
        );
    };

    // Función para obtener el nombre del producto por ID
    const getNombreProducto = (id) => {
        const prod = productos?.data.find(p => p.id === id);
        return prod ? prod.nombre : id;
    };

    return (
        <div className="movimientos-container">
            <h2 className="movimientos-title">Movimientos</h2>
            <form className="movimientos-form" onSubmit={handleSubmit}>
                <select
                    name="productoId"
                    value={form.productoId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione producto</option>
                    {productos?.data.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.nombre}
                        </option>
                    ))}
                </select>
                <select name="tipo" value={form.tipo} onChange={handleChange}>
                    <option value="ingreso">Ingreso</option>
                    <option value="venta">Venta</option>
                </select>
                <input
                    type="number"
                    name="cantidad"
                    value={form.cantidad}
                    min="1"
                    onChange={handleChange}
                    required
                    placeholder="Cantidad"
                />
                <button type="submit" disabled={crearMovimiento.isLoading}>
                    {crearMovimiento.isLoading ? "Registrando..." : "Registrar movimiento"}
                </button>
            </form>
            <table className="movimientos-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr><td colSpan={5}>Cargando...</td></tr>
                    ) : (
                        data?.data.map(mov => (
                            <tr key={mov.id}>
                                <td>{mov.id}</td>
                                <td>{getNombreProducto(mov.productoId)}</td>
                                <td>{mov.tipo}</td>
                                <td>{mov.cantidad}</td>
                                <td>{new Date(mov.fechaHora).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MovimientosPage;