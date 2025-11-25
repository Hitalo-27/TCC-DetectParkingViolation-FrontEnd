"use client";

import { 
  Camera, 
  ScanFace, 
  Ruler, 
  TextSelect, 
  Database, 
  ArrowRight 
} from "lucide-react";

export function ArchitectureFlow() {
  const steps = [
    {
      id: "01",
      title: "Captura & Input",
      icon: Camera,
      tech: "Monitoramento",
      description: "Recebimento de frames via upload ou câmeras urbanas para análise inicial.",
      color: "bg-gray-100 text-gray-600",
      borderColor: "border-gray-200"
    },
    {
      id: "02",
      title: "Detecção IA",
      icon: ScanFace,
      tech: "YOLOv11",
      description: "Segmentação de instâncias: identifica veículos, calçadas, guias e sinalização.",
      color: "bg-blue-100 text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      id: "03",
      title: "Validação Lógica",
      icon: Ruler,
      tech: "Algoritmo Espacial",
      description: "Verifica infrações por Interseção (sobreposição) ou Relacional (distância da placa).",
      color: "bg-amber-100 text-amber-600",
      borderColor: "border-amber-200"
    },
    {
      id: "04",
      title: "Extração ALPR",
      icon: TextSelect,
      tech: "OCR & Metadata",
      description: "Leitura automática da placa, identificação de cor e registro de data/hora.",
      color: "bg-purple-100 text-purple-600",
      borderColor: "border-purple-200"
    },
    {
      id: "05",
      title: "Ação & Registro",
      icon: Database,
      tech: "API REST / MySQL",
      description: "Persistência no banco de dados e notificação automática ao usuário.",
      color: "bg-emerald-100 text-emerald-600",
      borderColor: "border-emerald-200"
    },
  ];

  return (
    <div className="w-full py-10 px-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900">
          Arquitetura de Processamento
        </h3>
        <p className="text-gray-500 mt-3 text-sm leading-relaxed">
          Fluxo automatizado baseado na arquitetura proposta no TCC, integrando 
          Visão Computacional e Lógica de Validação conforme as regras do CTB.
        </p>
      </div>

      <div className="relative">
        {/* Linha de Conexão (Desktop) */}
        <div className="hidden lg:block absolute top-10 left-10 right-10 h-0.5 bg-gradient-to-r from-gray-200 via-blue-200 to-emerald-200 -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center group">
              
              {/* Card Flutuante ao passar o mouse (Tooltip Gigante) */}
              <div className="lg:absolute lg:-top-24 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 bg-gray-900 text-white p-3 rounded-lg text-xs w-48 text-center pointer-events-none mb-4 lg:mb-0 shadow-xl transform lg:translate-y-2 lg:group-hover:translate-y-0 z-20">
                {step.description}
                <div className="hidden lg:block absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
              </div>

              {/* Círculo Principal */}
              <div className={`
                relative flex items-center justify-center w-20 h-20 rounded-full 
                ${step.color} border-4 border-white shadow-lg 
                group-hover:scale-110 transition-transform duration-300 z-10
                ${step.borderColor}
              `}>
                <step.icon strokeWidth={1.5} className="w-8 h-8" />
                
                {/* Badge de Tecnologia */}
                <div className="absolute -bottom-3 px-2 py-0.5 bg-white border border-gray-100 rounded-full text-[10px] font-bold text-gray-700 shadow-sm whitespace-nowrap">
                  {step.tech}
                </div>
              </div>

              {/* Seta Mobile (aparece entre itens apenas no celular) */}
              {index !== steps.length - 1 && (
                <div className="lg:hidden mt-4 text-gray-300">
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </div>
              )}

              {/* Textos */}
              <div className="mt-6 text-center">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Passo {step.id}
                </span>
                <h4 className="font-semibold text-gray-900 text-sm px-2">
                  {step.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}