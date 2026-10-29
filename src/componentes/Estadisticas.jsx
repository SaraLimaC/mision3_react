// Solo muestra datos que le llegan ya calculados desde App
export default function Estadisticas({ cantidad, poblacion, filtrado }) {
  return (
    <p className="estadisticas">
      Resultados: {cantidad} | Población total {filtrado ? "de los resultados" : "mundial"}:{" "}
      {poblacion.toLocaleString("es-ES")}
    </p>
  );
}