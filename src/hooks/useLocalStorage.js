import { useState, useCallback } from "react";

// Hook personalizado: funciona como useState, pero guarda el valor en localStorage para que siga ahí al recargar la página.

export function useLocalStorage(clave, valorInicial) {

  const [valor, setValor] = useState(() => {
    try {
      const guardado = localStorage.getItem(clave);
      return guardado !== null ? JSON.parse(guardado) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  // useCallback hace que esta función sea siempre la misma entre renders,
  const guardar = useCallback(
    (nuevoValor) => {
      setValor(nuevoValor);
      try {
        localStorage.setItem(clave, JSON.stringify(nuevoValor));
      } catch {
        // Si el navegador no deja guardar, la app sigue funcionando
      }
    },
    [clave]
  );

  return [valor, guardar];
}