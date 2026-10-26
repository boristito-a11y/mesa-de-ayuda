import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const PRIORIDADES = ["baja", "media", "alta"]

function SolicitudForm({ onAgregar, numeroSiguiente }) {
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [solicitante, setSolicitante] = useState("")
  const [prioridad, setPrioridad] = useState("media")
  const [errores, setErrores] = useState({})

  const validar = () => {
    const nuevosErrores = {}
    if (titulo.trim() === "") {
      nuevosErrores.titulo = "El título es obligatorio"
    } else if (titulo.trim().length < 5) {
      nuevosErrores.titulo = "El título debe tener al menos 5 caracteres"
    }
    if (descripcion.trim() === "") {
      nuevosErrores.descripcion = "Describe el problema para poder atenderlo"
    }
    return nuevosErrores
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    onAgregar({
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      solicitante: solicitante.trim() || "Anónimo",
      prioridad,
    })

    setTitulo("")
    setDescripcion("")
    setSolicitante("")
    setPrioridad("media")
  }

  const estiloLabel =
    "font-ticket text-[11px] uppercase tracking-[0.15em] text-tinta-suave"
  const estiloLinea =
    "h-10 rounded-none border-0 border-b-[1.5px] border-tinta bg-transparent px-0 text-[15px] shadow-none focus-visible:border-naranja focus-visible:ring-0"

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-[1.5px] border-tinta bg-papel-claro p-6 shadow-[6px_6px_0_#1F1C17]"
    >
      <div className="mb-5 flex justify-between border-b border-dashed border-tinta pb-3 font-ticket text-[13px] font-semibold tracking-widest">
        <span>NUEVA SOLICITUD</span>
        <span>N° {String(numeroSiguiente).padStart(4, "0")}</span>
      </div>

      <div className="space-y-5">
        <div className="space-y-1">
          <Label htmlFor="titulo" className={estiloLabel}>Título</Label>
          <Input
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej. No enciende el monitor"
            aria-invalid={!!errores.titulo}
            className={`${estiloLinea} ${errores.titulo ? "border-alerta" : ""}`}
          />
          {errores.titulo && (
            <p className="font-ticket text-xs text-alerta">✕ {errores.titulo}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="descripcion" className={estiloLabel}>Descripción</Label>
          <Textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="¿Qué pasó y desde cuándo?"
            aria-invalid={!!errores.descripcion}
            className={`min-h-24 rounded-none border-[1.5px] bg-[repeating-linear-gradient(transparent_0_23px,#e2dac8_23px_24px)] leading-6 shadow-none focus-visible:ring-0 focus-visible:border-naranja ${
              errores.descripcion ? "border-alerta" : "border-tinta"
            }`}
          />
          {errores.descripcion && (
            <p className="font-ticket text-xs text-alerta">✕ {errores.descripcion}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="solicitante" className={estiloLabel}>Solicitante</Label>
          <Input
            id="solicitante"
            value={solicitante}
            onChange={(e) => setSolicitante(e.target.value)}
            placeholder="Tu nombre"
            className={estiloLinea}
          />
        </div>

        <div className="space-y-2">
          <Label className={estiloLabel}>Prioridad</Label>
          <div className="grid grid-cols-3 border-[1.5px] border-tinta">
            {PRIORIDADES.map((p) => (
              <Button
                key={p}
                type="button"
                variant="ghost"
                onClick={() => setPrioridad(p)}
                className={`h-10 rounded-none border-r-[1.5px] border-tinta font-ticket text-xs uppercase last:border-r-0 ${
                  prioridad === p
                    ? p === "alta"
                      ? "bg-naranja text-white hover:bg-naranja hover:text-white"
                      : "bg-tinta text-papel hover:bg-tinta hover:text-papel"
                    : "bg-transparent hover:bg-papel"
                }`}
              >
                {p}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="mt-6 h-12 w-full rounded-none font-ticket text-sm font-semibold tracking-[0.2em] transition-transform active:translate-y-0.5"
      >
        EMITIR TICKET →
      </Button>
    </form>
  )
}

export default SolicitudForm