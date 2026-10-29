import PaisItem from "./PaisItem.jsx";

// Recorre los países con map y pinta un PaisItem por cada uno.
// La key es el nombre, que es único y no cambia aunque se filtre o se reordene.
export default function ListaPaises({ paises, onSeleccionar }) {
  if (paises.length === 0) {
    return <p className="vacio">No hay países que coincidan con el filtro.</p>;
  }

  return (
    <div className="lista-paises">
      {paises.map((pais) => (
        <PaisItem key={pais.name} pais={pais} onSeleccionar={onSeleccionar} />
      ))}
    </div>
  );
}