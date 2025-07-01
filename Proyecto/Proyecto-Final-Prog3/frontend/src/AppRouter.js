import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AgregarProducto from './pages/AgregarProducto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AgregarProducto" element={<AgregarProducto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;