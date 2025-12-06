// src/components/CardStat.jsx
export default function CardStat({ title, value, subtitle, accent }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <small className="text-muted">{title}</small>
        <h3 className={`fw-bold ${accent ? "text-" + accent : ""}`}>{value}</h3>
        {subtitle && <div className="text-muted small">{subtitle}</div>}
      </div>
    </div>
  );
}
