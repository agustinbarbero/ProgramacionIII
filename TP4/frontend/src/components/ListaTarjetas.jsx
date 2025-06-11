import TarjetaPersona from './TarjetaPersona';

const ListaTarjetas = ({ personas }) => {
    return(
        <div className='lista-tarjetas' style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
            {personas.map((persona) => (
                <TarjetaPersona key={personas.id} persona={persona} />
            ))}
        </div>
    );
};

export default ListaTarjetas;