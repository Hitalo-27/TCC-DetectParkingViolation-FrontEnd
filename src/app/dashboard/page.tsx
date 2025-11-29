"use client";

import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { useRouter } from "next/navigation";
import { ArchitectureFlow } from "@/src/components/ui/architectureflow";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Cabeçalho */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Painel de Controle
          </h1>
          <p className="text-gray-500">
            Sistema de Detecção Automatizada de Infrações de Estacionamento
          </p>
        </div>

        {/* AQUI ENTRA O CARROSSEL EXPLICATIVO (ESTILO GOLFINHO) */}
        <ArchitectureFlow />

        <div className="my-8 border-t border-gray-200" />

        {/* Cards de Funcionalidades */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Consultar Infrações</h2>
            <p className="text-gray-600 mb-6">
              Pesquise infrações por placa do veículo e visualize detalhes completos
              incluindo imagens processadas, localização no mapa e metadados extraídos.
            </p>
            <Button
              onClick={() => router.push("/dashboard/search")}
              className="w-full"
              size="lg"
            >
              Acessar Consulta
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Validar Infração</h2>
            <p className="text-gray-600 mb-6">
              Envie imagens para análise automática utilizando nossos modelos de IA
              treinados para detectar múltiplos tipos de infrações de estacionamento.
            </p>
            <Button
              onClick={() => router.push("/dashboard/validate")}
              className="w-full"
              size="lg"
            >
              Acessar Validação
            </Button>
          </Card>
        </div>

        <div className="my-8 border-t border-gray-200" />

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-gray-600">Precisão na Detecção</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-gray-600">Tipos de Infração</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">YOLOv11</div>
            <div className="text-sm text-gray-600">Modelo SOTA</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">800+</div>
            <div className="text-sm text-gray-600">Imagens Treino</div>
          </Card>
        </div>
      </div>
    </div>
  );
}