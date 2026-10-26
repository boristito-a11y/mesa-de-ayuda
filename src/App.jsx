import { useState } from "react"
import SolicitudForm from "@/components/SolicitudForm"
import FiltrosSolicitudes from "@/components/FiltrosSolicitudes"
import ListaSolicitudes from "@/components/ListaSolicitudes"

function App() {
  // Estado principal: la lista de solicitudes y el filtro elegido
  const [solicitudes, setSolicitudes] = useState([])
  const [filtro, setFiltro] = useState("todas")
  const [siguienteId, setSiguienteId] = useState(1)

  // Se envía a SolicitudForm: recibe los datos del formulario
  const agregarSolicitud = (datos) => {
    const nueva = {
      id: siguienteId,
      ...datos,
      estado: "pendiente",
      fecha: new Date(),
    }
    setSolicitudes([nueva, ...solicitudes])
    setSiguienteId(siguienteId + 1)
  }

  // Se envía a SolicitudItem (pasando por ListaSolicitudes)
  const cambiarEstado = (id, nuevoEstado) => {
    setSolicitudes(
      solicitudes.map((s) => (s.id === id ? { ...s, estado: nuevoEstado } : s))
    )
  }

  const eliminarSolicitud = (id) => {
    setSolicitudes(solicitudes.filter((s) => s.id !== id))
  }

  // Se envía a FiltrosSolicitudes
  const cambiarFiltro = (nuevoFiltro) => {
    setFiltro(nuevoFiltro)
  }

  // El padre calcula qué solicitudes recibe la lista (comunicación entre hermanos)
  const solicitudesFiltradas =
    filtro === "todas" ? solicitudes : solicitudes.filter((s) => s.estado === filtro)

  const conteo = {
    todas: solicitudes.length,
    pendiente: solicitudes.filter((s) => s.estado === "pendiente").length,
    "en-proceso": solicitudes.filter((s) => s.estado === "en-proceso").length,
    resuelta: solicitudes.filter((s) => s.estado === "resuelta").length,
  }

  const hoy = new Date().toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 text-tinta md:px-10 md:py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-[3px] border-double border-tinta pb-4">
        <h1 className="font-ticket text-3xl font-semibold tracking-tight">
          <span className="mr-2 bg-tinta px-2 text-papel">MESA</span>
          de ayuda · TI
        </h1>
        <div className="text-right font-ticket text-xs leading-relaxed uppercase">
          <p>{hoy}</p>
          <p>{conteo.pendiente} ticket(s) por atender</p>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
        <aside>
          <SolicitudForm onAgregar={agregarSolicitud} numeroSiguiente={siguienteId} />
        </aside>

        <section>
          <FiltrosSolicitudes
            filtroActual={filtro}
            onCambiarFiltro={cambiarFiltro}
            conteo={conteo}
          />
          <div className="border-[1.5px] border-tinta bg-papel-claro p-5">
            <ListaSolicitudes
              solicitudes={solicitudesFiltradas}
              onCambiarEstado={cambiarEstado}
              onEliminar={eliminarSolicitud}
            />
          </div>
        </section>
      </div>
    </main>
  )
}

export default App