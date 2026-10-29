import { datosPais } from "../logica.js";

// Detalle de un país, con botón para volver y para añadirlo al comparador

export default function FichaPais({ pais, enComparador, onComparar, onVolver }) {
  const datos = datosPais(pais);

  return (
    <section>
      <button className="volver" onClick={onVolver}>
        ← Volver
      </button>

      <article className="ficha">
        <img
          className="ficha-bandera"
          src={pais.flags?.svg || ""}
          alt={`Bandera de ${pais.name}`}
        />
        <h2>{pais.name}</h2>

        <dl>
          <dt>Capital</dt>
          <dd>{datos.capital}</dd>

          <dt>Población</dt>
          <dd>{datos.poblacion}</dd>

          <dt>Región</dt>
          <dd>{datos.region}</dd>

          <dt>Subregión</dt>
          <dd>{datos.subregion}</dd>

          <dt>Moneda</dt>
          <dd>{datos.moneda}</dd>
        </dl>

        <button className="secundario" onClick={() => onComparar(pais)}>
          {enComparador ? "Quitar del comparador" : "Añadir al comparador"}
        </button>
      </article>
    </section>
  );
}

