import { useEffect, useState } from "react";
import { getProductos, createProducto, updateProducto } from "../services/productosService";

export default function InventarioPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    stock: 0,
    precio: 0,
  });

  const fetchData = async () => {
    setLoading(true);
    const data = await getProductos();
    setProductos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ nombre: "", categoria: "", stock: 0, precio: 0 });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item.id);
    setForm(item);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (editing) {
      await updateProducto(editing, form);
    } else {
      await createProducto(form);
    }
    fetchData();
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Inventario</h2>
        <button className="btn btn-primary" onClick={openCreate}>
          + Agregar Producto
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>{p.stock}</td>
                  <td>${p.precio}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => openEdit(p)}
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
                  {editing ? "Editar Producto" : "Nuevo Producto"}
                </h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Nombre"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Categoría"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio"
                  value={form.precio}
                  onChange={(e) => setForm({ ...form, precio: e.target.value })}
                />
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
