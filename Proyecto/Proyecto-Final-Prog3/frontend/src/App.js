import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>¡Bienvenido a tu nueva aplicación!</h1>
        <p>Frontend React funcionando correctamente</p>
        <p>
          <a href="/api/health" target="_blank" rel="noopener noreferrer">
            Verificar estado de la API
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
