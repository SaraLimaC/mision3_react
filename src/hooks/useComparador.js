import { useState } from "react";

const MAXIMO = 2;

// Gestiona la lista de países a comparar 

export function useComparador() {
  const [comparados, setComparados] = useState([]);

  function estaComparado(pais) {
    return comparados.some((p) => p.name === pais.name);
  }

  function alternar(pais) {
    setComparados((anteriores) => {
      if (anteriores.some((p) => p.name === pais.name)) {
        return anteriores.filter((p) => p.name !== pais.name);
      }
      // Si ya hay 4 y añades otro, se sustituye por el más antiguo.
      if (anteriores.length >= MAXIMO) {
        return [anteriores[1], pais];
      }
      return [...anteriores, pais];
    });
  }

  function quitar(pais) {
    setComparados((anteriores) => anteriores.filter((p) => p.name !== pais.name));
  }

  return { comparados, estaComparado, alternar, quitar };
}