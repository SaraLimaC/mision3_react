import { useState, useEffect } from "react";
import { cargarPaises } from "../api.js";
import { useLocalStorage } from "./useLocalStorage.js";

// Carga la lista de países (desde la caché o desde la API)
// y devuelve { paises, cargando, error }
export function usePaises() {
  const [paises, setPaises] = useLocalStorage("paises", []);
  // Si ya hay países guardados no hace falta cargar nada
  const [cargando, setCargando] = useState(paises.length === 0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cargando) return;

    const controlador = new AbortController();

    cargarPaises(controlador.signal)
      .then((datos) => {
        setPaises(datos);
        setCargando(false);
      })
      .catch((e) => {
        // Si se cancela a propósito (cleanup) no es un error real
        if (e.name !== "AbortError") {
          setError(e.message);
          setCargando(false);
        }
      });

    // Limpieza: cancela la petición si el componente se desmonta
    return () => controlador.abort();
  }, [cargando, setPaises]);

  return { paises, cargando, error };
}