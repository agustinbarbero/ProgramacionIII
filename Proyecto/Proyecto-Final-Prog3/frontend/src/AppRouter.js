import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import CategoriasPage from './pages/CategoriasPage';
import MovimientosPage from './pages/MovimientosPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/movimientos" element={<MovimientosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;