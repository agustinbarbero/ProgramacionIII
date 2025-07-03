import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AgregarProducto from './pages/AgregarProducto';
import Movimientos from './pages/Movimientos';
import AgregarMovimiento from './pages/AgregarMovimiento';
import CrearCategorias from './pages/crearCategorias';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AgregarProducto" element={<AgregarProducto />} />
        <Route path="/movimientos" element={<Movimientos />} />
        <Route path="/agregar-movimiento" element={<AgregarMovimiento />} />
        <Route path="/crear-categoria" element={<CrearCategorias />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;