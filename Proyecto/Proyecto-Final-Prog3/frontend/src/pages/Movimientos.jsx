import { useMovimientos } from "../hooks/useMovimiento";

function Movimientos() {
    const { data, isLoading, error } = useMovimientos();

    if (isLoading) return <div>Cargando movimientos...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Movimientos de Inventario</h2>
            <table>
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
                    {data?.data.map((mov) => (
                        <tr key={mov.id}>
                            <td>{mov.id}</td>
                            <td>{mov.productoId}</td>
                            <td>{mov.tipo}</td>
                            <td>{mov.cantidad}</td>
                            <td>{new Date(mov.fechaHora).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Movimientos;
