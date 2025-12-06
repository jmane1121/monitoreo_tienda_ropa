import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";
import { useContext } from "react";

export default function NavBar() {
    const { user, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to={"/"}>SGI</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mainNav">
                    {user && (
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item"><Link className="nav-link" to={"/"}>Dashboard</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={"/productos"}>Productos</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={"/inventario"}>Inventario</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={"/maquila"}>Maquila</Link></li>
                        </ul>
                    )}
                    <div className="d-flex align-item-center">
                        {user ? (
                            <>
                                <span className="text-white me-3">{user.nombre}</span>
                                <button 
                                    className="btn btn-outline-light btn-sm"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ):(
                            <Link className="btn btn-primary btn-sm">Ingresar</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}