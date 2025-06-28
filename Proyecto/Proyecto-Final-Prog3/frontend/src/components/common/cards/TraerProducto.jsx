import { useState, useEffect } from "react";
import axios from "axios";
import ListaTarjetas from './ListaTarjetas';

const TraerProductos = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";
                const respuesta = await axios.get(`${baseURL}/productos`);
                setProductos(respuesta.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };
        obtenerProductos();
    }, []);

    if (cargando) return <div>Cargando productos...</div>;
    if (error) return <div>Error: {error}</div>;

    return <ListaTarjetas productos={productos} />;
};

export default TraerProductos;