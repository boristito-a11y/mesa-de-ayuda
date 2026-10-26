import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const FILTROS = [
  { valor: "todas", texto: "Todas" },
  { valor: "pendiente", texto: "Pendientes" },
  { valor: "en-proceso", texto: "En proceso" },
  { valor: "resuelta", texto: "Resueltas" },
]

function FiltrosSolicitudes({ filtroActual, onCambiarFiltro, conteo }) {
  return (
    <Tabs value={filtroActual} onValueChange={onCambiarFiltro}>
      <TabsList className="relative z-10 -mb-[1.5px] h-auto flex-wrap justify-start gap-1 rounded-none bg-transparent p-0">
        {FILTROS.map((filtro) => (
          <TabsTrigger
            key={filtro.valor}
            value={filtro.valor}
            className="h-auto flex-none rounded-t-md rounded-b-none border-[1.5px] border-b-0 border-tinta bg-papel-oscuro px-4 py-2 font-ticket text-xs text-tinta data-[state=active]:bg-papel-claro data-[state=active]:font-semibold data-[state=active]:shadow-none"
          >
            {filtro.texto}
            <span className="ml-1 opacity-50">{conteo[filtro.valor]}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default FiltrosSolicitudes