import { useState } from "react";

const MAXIMO = 2;

// Gestiona la lista de países a comparar (máximo 2).
// Si ya hay dos y añades otro, se sustituye el más antiguo.
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