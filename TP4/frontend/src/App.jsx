import { useState, useEffect } from 'react'
import TraerPersonas from './components/TraerPersonas'

function App() {
  return (
    <div className='App'>
      <h1 style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'50px'}}>Alumnos</h1>
      <TraerPersonas />
    </div>
  );
}

export default App