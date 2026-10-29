import { datosPais, obtenerPaisMasPoblado } from "../logica.js";

// Filas de la tabla: [texto que se ve, campo de datosPais]
const FILAS = [
  ["Capital", "capital"],
  ["Región", "region"],
  ["Subregión", "subregion"],
  ["Moneda", "moneda"],
  ["Población", "poblacion"],
];

// Tabla con dos países lado a lado.
// Qué país es el más poblado NO se guarda en estado: se calcula aquí al pintar.
export default function Comparador({ paises, onVolver }) {
  const masPoblado = obtenerPaisMasPoblado(paises);
  const datos = paises.map(datosPais);

  return (
    <section>
      <button className="volver" onClick={onVolver}>
        ← Volver
      </button>

      <div className="tabla-scroll">
        <table className="comparador">
          <thead>
            <tr>
              <th></th>
              {paises.map((pais) => (
                <th key={pais.name}>
                  <img src={pais.flags?.svg || ""} alt="" width="48" />
                  <div>{pais.name}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {FILAS.map(([etiqueta, campo]) => (
              <tr key={campo}>
                <th scope="row">{etiqueta}</th>
                {paises.map((pais, i) => (
                  <td
                    key={pais.name}
                    className={campo === "poblacion" && pais === masPoblado ? "mayor" : ""}
                  >
                    {datos[i][campo]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="nota">
        Más poblado: <strong>{masPoblado.name}</strong>
      </p>
    </section>
  );
}