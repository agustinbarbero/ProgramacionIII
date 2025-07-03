import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createCategoria } from "../services/categoriaService";

function CrearCategorias() {
    const [nombre, setNombre] = useState("");
    const queryClient = useQueryClient();

    const mutation = useMutation(createCategoria, {
        onSuccess: () => {
            queryClient.invalidateQueries("categorias");
            setNombre("");
            alert("Categoría creada correctamente");
        },
        onError: (error) => {
            alert(
                "Error al crear la categoría: " +
                (error.response?.data?.message || error.message)
            );
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre.trim()) {
            alert("El nombre es obligatorio");
            return;
        }
        mutation.mutate({ nombre });
    };

    return (
        <div>
            <h2>Crear Categoría</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre de la categoría"
                    required
                />
                <button type="submit" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Creando..." : "Crear"}
                </button>
            </form>
        </div>
    );
}

export default CrearCategorias;
