// Muestra "Cargando..." o un error. 
export default function Mensaje({ texto }) {
  if (!texto) return null;
  return (
    <p className="mensaje" role="status">
      {texto}
    </p>
  );
}