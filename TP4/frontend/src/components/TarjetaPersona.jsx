import '../assets/tarjetas.css'

const TarjetaPersona = ({ persona }) => {
    return (
        <div className="tarjeta-container">
            <div className="tarjeta-persona">
                <h2>{persona.nombre} {persona.apellido}</h2>
                <p><strong>Edad:</strong> {persona.edad}</p>
                <p><strong>Email:</strong> {persona.email}</p>
                <p><strong>ID:</strong> {persona.id}</p>
            </div>
        </div>
    );
};

export default TarjetaPersona;