// Se muestran los países elegidos para comparar y el botón para verlos.
export default function BarraComparar({ comparados, onQuitar, onVer }) {
  if (comparados.length === 0) return null;

  return (
    <div className="barra-comparar">
      <span>Comparar:</span>

      {comparados.map((pais) => (
        <span key={pais.name} className="chip">
          {pais.name}
          <button
            className="chip-quitar"
            aria-label={`Quitar ${pais.name}`}
            onClick={() => onQuitar(pais)}
          >
            ✕
          </button>
        </span>
      ))}

      <button disabled={comparados.length < 2} onClick={onVer}>
        Ver comparación
      </button>
    </div>
  );
}