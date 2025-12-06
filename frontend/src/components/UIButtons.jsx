// src/components/UIButtons.jsx
export function Primary({ children, ...props }) {
  return <button className="btn btn-primary" {...props}>{children}</button>;
}
export function Secondary({ children, ...props }) {
  return <button className="btn btn-outline-secondary" {...props}>{children}</button>;
}
export function Danger({ children, ...props }) {
  return <button className="btn btn-danger" {...props}>{children}</button>;
}
