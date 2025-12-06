import { useEffect, useState } from "react";
import { getMaquila, createMaquilaOrden, updateMaquila } from "../services/maquilaService";

export default function MaquilaPage() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    cliente: "",
    producto: "",
    cantidad: 0,
    estado: "pendiente",
  });

  const fetchData = async () => {
    setLoading(true);
    const data = await getMaquila();
    setOrdenes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ cliente: "", producto: "", cantidad: 0, estado: "pendiente" });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item.id);
    setForm(item);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (editing) {
      await updateMaquila(editing, form);
    } else {
      await createMaquilaOrden(form);
    }
    fetchData();
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Órdenes de Maquila</h2>
        <button className="btn btn-primary" onClick={openCreate}>
          + Nueva Orden
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((o) => (
                <tr key={o.id}>
                  <td>{o.cliente}</td>
                  <td>{o.producto}</td>
                  <td>{o.cantidad}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        o.estado === "terminado"
                          ? "success"
                          : o.estado === "proceso"
                          ? "warning"
                          : "secondary"
                      }`}
                    >
                      {o.estado}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => openEdit(o)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ background: "#00000090" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editing ? "Editar Orden" : "Nueva Orden"}
                </h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Cliente"
                  value={form.cliente}
                  onChange={(e) => setForm({ ...form, cliente: e.target.value })}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Producto"
                  value={form.producto}
                  onChange={(e) => setForm({ ...form, producto: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Cantidad"
                  value={form.cantidad}
                  onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
                />

                <select
                  className="form-select"
                  value={form.estado}
                  onChange={(e) => setForm({ ...form, estado: e.target.value })}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="proceso">En proceso</option>
                  <option value="terminado">Terminado</option>
                </select>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
