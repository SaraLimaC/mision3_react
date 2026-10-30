import { useState, useMemo } from "react";

import {
  ordenarPaises,
  filtrarPorTexto,
  filtrarPorRegion,
  calcularPoblacionTotal,
} from "./logica.js";
import { usePaises } from "./hooks/usePaises.js";
import { useComparador } from "./hooks/useComparador.js";
import { usePaisDetalle } from "./hooks/usePaisDetalle.js";

import Buscador from "./componentes/Buscador.jsx";
import FiltroRegion from "./componentes/FiltroRegion.jsx";
import Estadisticas from "./componentes/Estadisticas.jsx";
import BarraComparar from "./componentes/BarraComparar.jsx";
import Mensaje from "./componentes/Mensaje.jsx";
import ListaPaises from "./componentes/ListaPaises.jsx";
import FichaPais from "./componentes/FichaPais.jsx";
import Comparador from "./componentes/Comparador.jsx";

export default function App() {
  // ---------- Datos y lógica que vienen de los hooks ----------
  const { paises, cargando, error } = usePaises();
  const { detalle, aviso, abrir, limpiarAviso } = usePaisDetalle();
  const { comparados, estaComparado, alternar, quitar } = useComparador();

  // ---------- Estado propio de App ----------
  const [texto, setTexto] = useState("");
  const [region, setRegion] = useState("");
  const [vista, setVista] = useState("lista"); // "lista", "ficha" o "comparar"

  // ---------- Valores derivados (no son estado) ----------
  const textoLimpio = texto.trim();

  const visibles = useMemo(() => {
    let lista = ordenarPaises(paises);
    if (region) lista = filtrarPorRegion(lista, region);
    if (textoLimpio) lista = filtrarPorTexto(lista, textoLimpio);
    return lista;
  }, [paises, region, textoLimpio]);

  const poblacion = calcularPoblacionTotal(visibles);
  const hayFiltro = region !== "" || textoLimpio !== "";

  // Un único mensaje: el error de carga tiene prioridad sobre el resto
  const mensaje = error || aviso || (cargando ? "Cargando países..." : "");

  // ---------- Manejadores ----------
  async function abrirPais(nombre) {
    const abierto = await abrir(nombre);

    if (abierto) {
      setVista("ficha");
      window.scrollTo(0, 0);
    }
  }

  function volverALista() {
    setVista("lista");
    limpiarAviso();
  }

  // ---------- Lo que se ve ----------
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
              onQuitar={quitar}
              onVer={() => setVista("comparar")}
            />
            <Mensaje texto={mensaje} />
            {!cargando && (
              <ListaPaises paises={visibles} onSeleccionar={abrirPais} />
            )}
          </>
        )}

        {vista === "ficha" && detalle && (
          <FichaPais
            pais={detalle}
            enComparador={estaComparado(detalle)}
            onComparar={alternar}
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