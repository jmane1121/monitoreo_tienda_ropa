export default function PageHeader({title, subtitle}) {
    return (
        <div className="mb-4">
            <h2 className="fw-bold mb-1">{title}</h2>
            {subtitle && <p className="text-muted">{subtitle}</p>}
            <hr />
        </div>
    );
}