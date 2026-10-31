// Muestra "Cargando..." o un error. 
export default function Mensaje({ texto }) {
  return (
    <p className="mensaje" role="status">
      {texto}
    </p>
  );
}