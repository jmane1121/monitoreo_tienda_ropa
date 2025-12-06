// src/components/WidgetTopProducts.jsx
export default function WidgetTopProducts({ items = [] }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h6 className="mb-3">Productos con menos stock</h6>
        <ul className="list-unstyled">
          {items.map(it => (
            <li key={it.id} className="d-flex justify-content-between py-1 border-bottom">
              <span>{it.nombre}</span>
              <strong>{it.stock}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
