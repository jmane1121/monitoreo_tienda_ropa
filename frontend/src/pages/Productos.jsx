import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import { apiFetch } from "../services/api";

export default function Productos() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({nombre: "", modelo: "", color: "", talla:"", precio: "", stock:""});

    const load = () => apiFetch("/productos").then(setItems);
    useEffect(() => {load(); }, []);

    const submit = async e => {
        e.prevenDefault();
        await apiFetch("/productos", {method:"POST", body: form});
        setForm({ nombre: "", modelo: "", color: "", talla: "", precio: "", stock: "" });
        load();
    };

    const removeItem = async id =>{
        if(!confirm("Eliminar producto?")) return; 
        await apiFetch(`/productos/${id}`, {method: "DELETE"});
        load();
    };

    return(
        <>
            <PageHeader title="Productos" subtitle="Gestion de catálogo"/>
            {/**FORMULARIO */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <form className="row g-2" onSubmit={submit}>
                        {Object.keys(form).map(key =>(
                            <div className="col-md-2" key={key}>
                                <input
                                    className="form-control"
                                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                    value={form[key]}
                                    onChange={e => setForm({...form, [key]: e.target.value})}
                                />
                            </div>
                        ))}
                        <div className="col-md-2">
                            <button className="btn btn-primary w-100">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>

            {/**TABLA */}
            <Table
                columns={[
                    {key: "nombre", label: "Nombre"},
                    {key: "modelo", label: "Modelo"},
                    {key: "color", label: "Color"},
                    {key: "talla", label: "Talla"},
                    {key: "precio", label: "Precio"},
                    {key: "stock", label: "Stock"},
                    {
                        key: "acciones",
                        label: "Accion",
                        render: row => (
                            <button className="btn btn-danger btn-sm" onClick={() => removeItem(row.id)}>Eliminar</button>
                        )
                    }
                ]}
                data={items}
            />
        </>
    );
}