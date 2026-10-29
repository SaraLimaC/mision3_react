// Las regiones están fuera del componente porque no cambian nunca
const REGIONES = [
  { valor: "", nombre: "Todas" },
  { valor: "Europe", nombre: "Europa" },
  { valor: "Asia", nombre: "Asia" },
  { valor: "Africa", nombre: "África" },
  { valor: "Americas", nombre: "América" },
  { valor: "Oceania", nombre: "Oceanía" },
  { valor: "Polar", nombre: "Polar" },
  { valor: "Antarctic", nombre: "Antártida" },
  { valor: "Antarctic Ocean", nombre: "Océano Antártico" },
];

export default function FiltroRegion({ region, onCambioRegion }) {
  return (
    <label className="filtro-region">
      Región:
      <select value={region} onChange={(e) => onCambioRegion(e.target.value)}>
        {REGIONES.map((r) => (
          <option key={r.valor} value={r.valor}>
            {r.nombre}
          </option>
        ))}
      </select>
    </label>
  );
}