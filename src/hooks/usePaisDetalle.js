import { useState, useRef } from "react";
import { buscarPais } from "../api.js";

// Pide un país por nombre y guarda el resultado.

export function usePaisDetalle() {
  const [detalle, setDetalle] = useState(null);
  const [aviso, setAviso] = useState("");

  // Cuenta las peticiones: solo vale la última
  const ultimaPeticion = useRef(0);

  async function abrir(nombre) {
    nombre = nombre.trim();

    if (nombre === "") {
      setAviso("Escribe el nombre de un país.");
      return false;
    }

    const numero = ++ultimaPeticion.current;

    try {
      setAviso("Cargando...");

      const data = await buscarPais(nombre);

      // Si mientras se había pedido otro pues no se cancela y no se muestra
      if (numero !== ultimaPeticion.current) return false;

      const pais =
        data.find((p) => p.name.toLowerCase() === nombre.toLowerCase()) || data[0];

      if (!pais) throw new Error("País no encontrado");

      setDetalle(pais);
      setAviso("");
      return true;
    } catch (error) {
      if (numero === ultimaPeticion.current) setAviso(error.message);
      return false;
    }
  }

  function limpiarAviso() {
    setAviso("");
  }

  return { detalle, aviso, abrir, limpiarAviso };
}