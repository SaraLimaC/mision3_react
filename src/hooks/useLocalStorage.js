import { useState, useCallback } from "react";

// Hook personalizado: funciona como useState, pero guarda el valor en localStorage
// para que siga ahí al recargar la página.
// Uso: const [paises, setPaises] = useLocalStorage("paises", []);
export function useLocalStorage(clave, valorInicial) {
  // Al crear el estado intentamos leer lo guardado.
  // Si no hay nada o el JSON está estropeado, usamos el valor inicial.
  const [valor, setValor] = useState(() => {
    try {
      const guardado = localStorage.getItem(clave);
      return guardado !== null ? JSON.parse(guardado) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  // useCallback hace que esta función sea siempre la misma entre renders,
  // así se puede usar en el array de dependencias de un useEffect sin problemas.
  const guardar = useCallback(
    (nuevoValor) => {
      setValor(nuevoValor);
      try {
        localStorage.setItem(clave, JSON.stringify(nuevoValor));
      } catch {
        // Si el navegador no deja guardar (almacenamiento lleno), la app sigue funcionando
      }
    },
    [clave]
  );

  return [valor, guardar];
}