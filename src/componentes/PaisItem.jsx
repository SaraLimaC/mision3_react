// Una fila de la lista: bandera + nombre. Al hacer click avisa al padre.
export default function PaisItem({ pais, onSeleccionar }) {
  function alPulsarTecla(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSeleccionar(pais.name);
    }
  }
  return (
     <div
      className="pais-item"
      role="button"
      tabIndex={0}
      onClick={() => onSeleccionar(pais.name)}
      onKeyDown={alPulsarTecla}
    >
      <img src={pais.flags?.svg || ""} alt="" width="40" />
      <span>{pais.name}</span>
    </div>
  );
}