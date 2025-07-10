import { useState } from "react";
import { useCategorias } from "../hooks/useCategorias";
import { useMutation, useQueryClient } from "react-query";
import { createCategoria, deleteCategoria } from "../services/categoriaService";
import '../styles/CategoriasPage.css';

function CategoriasPage() {
    const [nombre, setNombre] = useState("");
    const { data, isLoading } = useCategorias();
    const queryClient = useQueryClient();

    const crearCategoria = useMutation(createCategoria, {
        onSuccess: () => {
            queryClient.invalidateQueries("categorias");
            setNombre("");
        }
    });

    const eliminarCategoria = useMutation(deleteCategoria, {
        onSuccess: () => queryClient.invalidateQueries("categorias"),
        onError: (error) => {
            alert(
                error.response?.data?.message ||
                "Error al eliminar la categoría"
            );
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre.trim()) return;
        if (data?.data.some(cat => cat.nombre.trim().toLowerCase() === nombre.trim().toLowerCase())) {
            alert("La categoría ya existe");
            return;
        }
        crearCategoria.mutate({ nombre });
    };

    return (
        <div className="categorias-container">
            <h2 className="categorias-title">Categorías</h2>
            <form className="categorias-form" onSubmit={handleSubmit}>
                <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nueva categoría" required />
                <button type="submit">Agregar Categoría</button>
            </form>
            <ul className="categorias-list">
                {isLoading ? (
                    <li>Cargando...</li>
                ) : (
                    data?.data.map(cat => (
                        <li key={cat.id}>
                            {cat.nombre}
                            <button onClick={() => eliminarCategoria.mutate(cat.id)}>Eliminar</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
export default CategoriasPage;