import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="navList">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "ativo" : "")}>
              Início
            </NavLink>
          </li>
          <li>
            <NavLink to="/cadastro" className={({ isActive }) => (isActive ? "ativo" : "")}>
              Cadastro
            </NavLink>
          </li>
          <li>
            <NavLink to="/listagem" className={({ isActive }) => (isActive ? "ativo" : "")}>
              Listagem
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

