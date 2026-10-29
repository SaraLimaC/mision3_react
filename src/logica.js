// Filtra por texto (países que empiezan por lo escrito)
export function filtrarPorTexto(paises, texto) {
  return paises.filter((pais) =>
    pais.name.toLowerCase().startsWith(texto.toLowerCase())
  );
}

// Filtra por región
export function filtrarPorRegion(paises, region) {
  return paises.filter((pais) => pais.region === region);
}

// Ordena países alfabéticamente (copia la lista para no modificar la original)
export function ordenarPaises(paises) {
  return [...paises].sort((a, b) => a.name.localeCompare(b.name));
}

// Calcula la población total (si a un país le falta el dato cuenta como 0)
export function calcularPoblacionTotal(paises) {
  return paises.reduce((total, pais) => total + (pais.population || 0), 0);
}

// Devuelve el país más poblado (null si la lista está vacía)
export function obtenerPaisMasPoblado(paises) {
  if (paises.length === 0) return null;

  return paises.reduce((maximo, pais) =>
    (pais.population || 0) > (maximo.population || 0) ? pais : maximo
  );
}

// Prepara los datos de un país para mostrarlos, con "—" si falta alguno.
// Lo usan la ficha y el comparador para no repetir código.
export function datosPais(pais) {
  const capital = Array.isArray(pais.capital)
    ? pais.capital.join(", ")
    : pais.capital;

  return {
    capital: capital || "—",
    region: pais.region || "—",
    subregion: pais.subregion || "—",
    moneda: pais.currencies?.[0]?.name || "—",
    poblacion: pais.population ? pais.population.toLocaleString("es-ES") : "—",
  };
}