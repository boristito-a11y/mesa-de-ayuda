import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ESTILO_PRIORIDAD = {
  alta: "border-alerta text-alerta",
  media: "border-mostaza text-mostaza",
  baja: "border-oliva text-oliva",
}

const SELLO = {
  pendiente: { texto: "PENDIENTE", color: "text-alerta" },
  "en-proceso": { texto: "EN PROCESO", color: "text-proceso" },
  resuelta: { texto: "RESUELTA", color: "text-resuelta" },
}

function SolicitudItem({ solicitud, onCambiarEstado, onEliminar }) {
  const { id, titulo, descripcion, solicitante, prioridad, estado, fecha } = solicitud
  const sello = SELLO[estado]
  const dia = fecha
    .toLocaleDateString("es-PE", { day: "2-digit", month: "short" })
    .toUpperCase()
  const hora = fecha.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })

  return (
    <Card
      className={`relative grid gap-0 overflow-visible rounded-none border-[1.5px] border-tinta bg-white py-0 shadow-none ring-0 md:grid-cols-[110px_1fr_200px] ${
        estado === "resuelta" ? "opacity-70" : ""
      }`}
    >
      {/* Agujeros del talonario */}
      <span className="absolute -top-2 left-[102px] hidden size-4 rounded-full border-[1.5px] border-tinta bg-papel-claro md:block" />
      <span className="absolute -bottom-2 left-[102px] hidden size-4 rounded-full border-[1.5px] border-tinta bg-papel-claro md:block" />

      {/* Talón con número y fecha */}
      <div className="flex justify-between border-b-2 border-dashed border-tinta bg-[#F6F0E2] p-3 md:flex-col md:border-r-2 md:border-b-0">
        <span className="font-ticket text-2xl font-semibold">
          #{String(id).padStart(3, "0")}
        </span>
        <span className="font-ticket text-[10px] leading-tight text-tinta-suave">
          {dia}
          <br />
          {hora}
        </span>
      </div>

      {/* Contenido */}
      <div className="px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[17px] font-semibold">{titulo}</h3>
          <Badge
            variant="outline"
            className={`rounded-none border-[1.5px] font-ticket text-[10px] uppercase ${ESTILO_PRIORIDAD[prioridad]}`}
          >
            {prioridad}
          </Badge>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-[#4a443a]">{descripcion}</p>
        <p className="mt-3 font-ticket text-[11px] text-tinta-suave">— {solicitante}</p>
      </div>

      {/* Sello y acciones */}
      <div className="flex flex-col items-end justify-between gap-4 border-t border-[#e6dfcf] p-4 md:border-t-0 md:border-l">
        <span
          className={`rotate-[-6deg] rounded-[3px] border-[2.5px] border-current px-2 py-1 font-ticket text-[13px] font-semibold tracking-[0.2em] ${sello.color}`}
        >
          {sello.texto}
        </span>
        <div className="flex items-center gap-2">
          <Select value={estado} onValueChange={(valor) => onCambiarEstado(id, valor)}>
            <SelectTrigger
              size="sm"
              className="w-[130px] rounded-none border-tinta bg-white font-ticket text-xs shadow-none"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none border-tinta font-ticket">
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en-proceso">En proceso</SelectItem>
              <SelectItem value="resuelta">Resuelta</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="link"
            size="sm"
            onClick={() => onEliminar(id)}
            className="px-1 font-ticket text-xs text-tinta-suave underline hover:text-alerta"
          >
            eliminar
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default SolicitudItem