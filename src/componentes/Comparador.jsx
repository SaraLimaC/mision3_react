import { datosPais, obtenerPaisMasPoblado } from "../logica.js";

const FILAS = [
  ["Capital", "capital"],
  ["Región", "region"],
  ["Subregión", "subregion"],
  ["Moneda", "moneda"],
  ["Población", "poblacion"],
];

// Tabla que compara los países
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
                    className={
                      campo === "poblacion" && masPoblado.population && pais.population === masPoblado.population? "mayor": ""
                    }
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