import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContex";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const handleSubmit = async e =>{
        e.preventDefault();
        try{
            await login(email, password);
            navigate("/");
        }catch(e){
            setErr(e.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{minHeight: "80vh"}}>
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <h3 className="fw-bold mb-3 text-center">Iniciar Sesión</h3>
                        {err && <div className="alert alert-danger">{err}</div>}
                        <form onSubmit="handleSubmit">
                            <input
                                type="email"
                                className="form-control mb-3"
                                placeholder="Correo Electronico"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Contraseña"
                                value={password}
                                onChange={e=> setPassword(e.target.value)}
                            />
                            <button className="btn btn-primary w-100">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}