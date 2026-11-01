import { useState, useEffect } from "react";
import { cargarPaises } from "../api.js";
import { useLocalStorage } from "./useLocalStorage.js";

// Cargamos la lista de paises de la API
export function usePaises() {
  const [paises, setPaises] = useLocalStorage("paises", []);
  const [hayCache] = useState(paises.length > 0);
  const [cargando, setCargando] = useState(paises.length === 0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hayCache) return;

    let ignorar = false;

    cargarPaises()
      .then((datos) => {
        if (ignorar) return;
        setPaises(datos);
        setCargando(false);
      })
      .catch((e) => {
        // Si se cancela 
        if (ignorar) return;
          setError(e.message);
          setCargando(false);
        
      });

    return () => ignorar = true;
  }, [hayCache, setPaises]);

  return { paises, cargando, error };
}