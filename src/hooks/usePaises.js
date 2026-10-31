import { useState, useEffect } from "react";
import { cargarPaises } from "../api.js";
import { useLocalStorage } from "./useLocalStorage.js";

// Cargamos la lista de paises de la API
export function usePaises() {
  const [paises, setPaises] = useLocalStorage("paises", []);
  // Si ya hay países guardados no hace falta cargar nada
  const [cargando, setCargando] = useState(paises.length === 0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cargando) return;

    let ignorar = false;

    cargarPaises()
      .then((datos) => {
        setPaises(datos);
        setCargando(false);
      })
      .catch((e) => {
        // Si se cancela 
        if (ignorar) {
          setError(e.message);
          setCargando(false);
        }
      });

    return () => ignorar = true;
  }, [cargando, setPaises]);

  return { paises, cargando, error };
}