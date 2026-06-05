import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cadastro from './Cadastro';
import Listagem from './Listagem'; // Importe a Listagem

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Início</Link> | 
        <Link to="/cadastro"> Cadastro</Link> | 
        <Link to="/listagem"> Listagem</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Página Inicial</h1>} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/listagem" element={<Listagem />} />
      </Routes>
    </Router>
  );
}