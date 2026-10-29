// Muestra "Cargando..." o un error. Si no hay texto, no se ve nada.
export default function Mensaje({ texto }) {
  return (
    <p className="mensaje" role="status">
      {texto}
    </p>
  );
}