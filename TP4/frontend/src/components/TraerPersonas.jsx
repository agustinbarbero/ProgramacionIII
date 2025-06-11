import { useState, useEffect } from "react";
import axios from "axios";
import ListaTarjetas from './ListaTarjetas';

const TraerPersonas = () => {
    const [personas, setPersonas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerPersonas = async () => {
            try {
                const respuesta = await axios.get('http://localhost:5000/api/personas');
                setPersonas(respuesta.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };
        obtenerPersonas();
    }, []);

    if (cargando) return <div>Cargando persona...</div>;
    if (error) return <div>Error: {error}</div>;

    return <ListaTarjetas personas={personas} />;
};

export default TraerPersonas;