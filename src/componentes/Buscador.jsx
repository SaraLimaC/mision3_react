
// Escribir para filtrar los países
export default function Buscador({ texto, onCambioTexto, onBuscar }) {
  return (
    <div className="buscador">
      <input
        type="text"
        value={texto}
        placeholder="Buscar país en inglés..."
        onChange={(e) => onCambioTexto(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onBuscar(texto);
        }}
      />
      <button onClick={() => onBuscar(texto)}>Buscar</button>
    </div>
  );
}