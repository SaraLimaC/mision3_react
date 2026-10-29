// Una fila de la lista: bandera + nombre. Al hacer click avisa al padre.
export default function PaisItem({ pais, onSeleccionar }) {
  return (
    <div className="pais-item" onClick={() => onSeleccionar(pais.name)}>
      <img src={pais.flags?.svg || ""} alt="" width="40" />
      <span>{pais.name}</span>
    </div>
  );
}