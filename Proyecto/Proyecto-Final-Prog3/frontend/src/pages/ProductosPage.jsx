import { useState } from "react";
import { useProductos, useEliminarProducto, useCrearProducto, useActualizarProducto } from "../hooks/useProductos";
import { useCategorias } from "../hooks/useCategorias";
import { useNavigate } from "react-router-dom";
import '../styles/ProductosPage.css';

function ProductosPage() {
    const { data, isLoading } = useProductos();
    const { data: categorias, isLoading: cargandoCategorias } = useCategorias();
    const eliminarProducto = useEliminarProducto();
    const crearProducto = useCrearProducto();
    const actualizarProducto = useActualizarProducto();
    const navigate = useNavigate();

    // Estado para el nuevo producto
    const [nuevoNombre, setNuevoNombre] = useState("");
    const [nuevoPrecio, setNuevoPrecio] = useState("");
    const [nuevoStock, setNuevoStock] = useState("");
    const [categoriaId, setCategoriaId] = useState("");

    // Estado para edición de precio
    const [editId, setEditId] = useState(null);
    const [editPrecio, setEditPrecio] = useState("");

    const handleEliminar = (id) => {
        if (window.confirm("¿Eliminar este producto?")) {
            eliminarProducto.mutate(id);
        }
    };

    const handleAgregar = () => {
        if (!nuevoNombre.trim() || !nuevoPrecio || !nuevoStock || !categoriaId) {
            alert("Completa todos los campos");
            return;
        }
        crearProducto.mutate(
            {
                nombre: nuevoNombre,
                precio: Number(nuevoPrecio),
                stock: Number(nuevoStock),
                categoriaId: Number(categoriaId)
            },
            {
                onSuccess: () => {
                    setNuevoNombre("");
                    setNuevoPrecio("");
                    setNuevoStock("");
                    setCategoriaId("");
                }
            }
        );
    };

    const handleModificar = (prod) => {
        setEditId(prod.id);
        setEditPrecio(prod.precio);
    };

    const handleGuardar = (prod) => {
        if (!editPrecio) {
            alert("El precio no puede estar vacío");
            return;
        }
        actualizarProducto.mutate(
            { id: prod.id, data: { precio: Number(editPrecio) } },
            {
                onSuccess: () => {
                    setEditId(null);
                    setEditPrecio("");
                }
            }
        );
    };

    return (
        <div className="productos-container">
            <h2 className="productos-title">Productos</h2>
            <div className="productos-form">
                <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={nuevoNombre}
                    onChange={e => setNuevoNombre(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={nuevoPrecio}
                    onChange={e => setNuevoPrecio(e.target.value)}
                    min="1"
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={nuevoStock}
                    onChange={e => setNuevoStock(e.target.value)}
                    min="1"
                />
                <select
                    value={categoriaId}
                    onChange={e => setCategoriaId(e.target.value)}
                    required
                >
                    <option value="">Seleccionar Categoría</option>
                    {cargandoCategorias
                        ? <option>Cargando...</option>
                        : categorias?.data.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                        ))}
                </select>
                <button onClick={handleAgregar} disabled={crearProducto.isLoading}>
                    {crearProducto.isLoading ? "Agregando..." : "Agregar Producto"}
                </button>
            </div>
            <ul className="productos-list">
                {isLoading ? (
                    <li>Cargando...</li>
                ) : (
                    data?.data.map(prod => (
                        <li key={prod.id}>
                            {prod.nombre} - $
                            {editId === prod.id ? (
                                <>
                                    <input
                                        type="number"
                                        value={editPrecio}
                                        onChange={e => setEditPrecio(e.target.value)}
                                        min="1"
                                        style={{ width: 80 }}
                                    />
                                    <button onClick={() => handleGuardar(prod)} disabled={actualizarProducto.isLoading}>
                                        Guardar
                                    </button>
                                    <button onClick={() => setEditId(null)}>Cancelar</button>
                                </>
                            ) : (
                                <>
                                    {prod.precio}
                                    <button onClick={() => handleModificar(prod)}>Modificar</button>
                                </>
                            )}
                            - Stock: {prod.stock}
                            <button onClick={() => handleEliminar(prod.id)}>Eliminar</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
export default ProductosPage;