import SolicitudItem from "@/components/SolicitudItem"

function ListaSolicitudes({ solicitudes, onCambiarEstado, onEliminar }) {
  if (solicitudes.length === 0) {
    return (
      <div className="border-2 border-dashed border-tinta-suave p-10 text-center">
        <p className="font-ticket text-sm text-tinta-suave">
          No hay tickets en esta bandeja.
        </p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-5">
      {solicitudes.map((solicitud) => (
        <li key={solicitud.id}>
          <SolicitudItem
            solicitud={solicitud}
            onCambiarEstado={onCambiarEstado}
            onEliminar={onEliminar}
          />
        </li>
      ))}
    </ul>
  )
}

export default ListaSolicitudes