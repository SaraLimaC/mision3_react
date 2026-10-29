import { useState, useEffect, useMemo } from "react";

import { cargarPaises, buscarPais } from "./api.js";
import {
  ordenarPaises,
  filtrarPorTexto,
  filtrarPorRegion,
  calcularPoblacionTotal,
} from "./logica.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

import Buscador from "./componentes/Buscador.jsx";
import FiltroRegion from "./componentes/FiltroRegion.jsx";
import Estadisticas from "./componentes/Estadisticas.jsx";
import BarraComparar from "./componentes/BarraComparar.jsx";
import Mensaje from "./componentes/Mensaje.jsx";
import ListaPaises from "./componentes/ListaPaises.jsx";
import FichaPais from "./componentes/FichaPais.jsx";
import Comparador from "./componentes/Comparador.jsx";

export default function App() {
  // ---------- ESTADO (solo lo mínimo) ----------
  // Todos los países, guardados también en localStorage como caché
  const [paises, setPaises] = useLocalStorage("paises", []);
  const [errorCarga, setErrorCarga] = useState("");

  // Lo que ha escrito/elegido el usuario
  const [texto, setTexto] = useState("");
  const [region, setRegion] = useState("");

  // Qué pantalla se ve: "lista", "ficha" o "comparar"
  const [vista, setVista] = useState("lista");
  const [detalle, setDetalle] = useState(null); // país abierto en la ficha
  const [comparados, setComparados] = useState([]); // hasta 2 países
  const [aviso, setAviso] = useState(""); // "Cargando..." o errores al abrir un país

  // ---------- EFECTO: cargar los países ----------
  // Solo se pide a la API si no hay países guardados en la caché.
  useEffect(() => {
    if (paises.length > 0) return;

    const controlador = new AbortController();

    cargarPaises(controlador.signal)
      .then(setPaises)
      .catch((error) => {
        // Si se cancela a propósito (cleanup) no es un error real
        if (error.name !== "AbortError") setErrorCarga(error.message);
      });

    // Limpieza: cancela la petición si el componente se desmonta
    // (con StrictMode en desarrollo esto se ejecuta una vez de prueba)
    return () => controlador.abort();
  }, [paises.length, setPaises]);

  // ---------- VALORES DERIVADOS (se calculan al pintar, no son estado) ----------
  const ordenados = useMemo(() => ordenarPaises(paises), [paises]);

  let visibles = ordenados;
  if (region) visibles = filtrarPorRegion(visibles, region);
  if (texto.trim()) visibles = filtrarPorTexto(visibles, texto.trim());

  const poblacion = calcularPoblacionTotal(visibles);
  const hayFiltro = region !== "" || texto.trim() !== "";
  const cargando = paises.length === 0 && errorCarga === "";

  // ---------- MANEJADORES DE EVENTOS ----------
  // Abre un país: lo pide a la API por su nombre
  async function abrirPais(nombre) {
    nombre = nombre.trim();

    if (nombre === "") {
      setAviso("Escribe el nombre de un país.");
      return;
    }

    try {
      setAviso("Cargando...");

      const data = await buscarPais(nombre);

      // Preferimos la coincidencia exacta; si no hay, el primer resultado
      const pais =
        data.find((p) => p.name.toLowerCase() === nombre.toLowerCase()) || data[0];

      if (!pais) throw new Error("País no encontrado");

      setDetalle(pais);
      setVista("ficha");
      setAviso("");
      window.scrollTo(0, 0);
    } catch (error) {
      setAviso(error.message);
    }
  }

  function volverALista() {
    setVista("lista");
    setAviso("");
  }

  // Añade o quita un país del comparador (máximo 2: si ya hay dos, sustituye el más antiguo)
  function alternarComparado(pais) {
    setComparados((anteriores) => {
      if (anteriores.some((p) => p.name === pais.name)) {
        return anteriores.filter((p) => p.name !== pais.name);
      }
      if (anteriores.length >= 2) {
        return [anteriores[1], pais];
      }
      return [...anteriores, pais];
    });
  }

  function quitarComparado(pais) {
    setComparados((anteriores) => anteriores.filter((p) => p.name !== pais.name));
  }

  // ---------- LO QUE SE VE ----------
  return (
    <>
      <header>
        <h1>🌍 Wikicountry</h1>
        <p>Busca países o selecciónalos de la lista</p>
      </header>

      <main>
        {vista === "lista" && (
          <>
            <Buscador texto={texto} onCambioTexto={setTexto} onBuscar={abrirPais} />
            <FiltroRegion region={region} onCambioRegion={setRegion} />
            <Estadisticas
              cantidad={visibles.length}
              poblacion={poblacion}
              filtrado={hayFiltro}
            />
            <BarraComparar
              comparados={comparados}
              onQuitar={quitarComparado}
              onVer={() => setVista("comparar")}
            />
            <Mensaje
              texto={errorCarga || aviso || (cargando ? "Cargando países..." : "")}
            />
            {!cargando && (
              <ListaPaises paises={visibles} onSeleccionar={abrirPais} />
            )}
          </>
        )}

        {vista === "ficha" && detalle && (
          <FichaPais
            pais={detalle}
            enComparador={comparados.some((p) => p.name === detalle.name)}
            onComparar={alternarComparado}
            onVolver={volverALista}
          />
        )}

        {vista === "comparar" && comparados.length === 2 && (
          <Comparador paises={comparados} onVolver={volverALista} />
        )}
      </main>
    </>
  );
}