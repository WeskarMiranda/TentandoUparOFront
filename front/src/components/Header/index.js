import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setCurrentPage(location.pathname);
    const userToken = localStorage.getItem("userToken");
    setIsAuthenticated(userToken ? true : false);
  }, [location]);

  function handleLogout() {
    localStorage.removeItem("userToken");
    setIsAuthenticated(false);
    navigate("/"); // Redirecionar para a página inicial após o logout
  }

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
          <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
        </a>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          {currentPage === "/" && !isAuthenticated && (
            <>
              <li>
                <Link to="/cadastro" className="btn btn-dark">Cadastrar</Link>
              </li>
              <li>
                <Link to="/login" className="btn btn-dark">Logar</Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <>
              <li>
                <Link to="/editarCadastro" className="btn btn-dark">Meu Perfil</Link>
              </li>
              <li>
                <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
}


