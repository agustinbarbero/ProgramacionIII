import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCrearMovimiento } from "../hooks/useMovimiento";
import { useProductos } from "../hooks/useProductos";

function AgregarMovimiento() {
    const navigate = useNavigate();
    const { data: productos } = useProductos();
    const crearMovimiento = useCrearMovimiento();
    const [form, setForm] = useState({
        productoId: "",
        tipo: "Ingreso",
        cantidad: 1,
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        crearMovimiento.mutate(
            { ...form, cantidad: Number(form.cantidad) },
            {
                onSuccess: () => alert("Movimiento registrado"),
                onError: (error) => alert("Error: " + error.message),
            }
        );
    };

    return (
        <form onSubmit={handleSubmit}>
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
                <option value="Ingreso">Ingreso</option>
                <option value="Venta">Venta</option>
            </select>
            <input
                type="number"
                name="cantidad"
                value={form.cantidad}
                min="1"
                onChange={handleChange}
                required
            />
            <button type="submit" disabled={crearMovimiento.isLoading}>
                {crearMovimiento.isLoading ? "Registrando..." : "Registrar movimiento"}
            </button>
        </form>
    );
}

export default AgregarMovimiento;
