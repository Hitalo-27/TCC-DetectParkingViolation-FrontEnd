"use client";

import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useState } from "react";

// Dados simulados de infração
const mockInfraction = {
  plate: "ABC1234",
  images: [
    "https://wallpapers.com/images/hd/4k-red-car-with-sunlight-at-forest-yv4lcxhpv99ide9a.jpg",
    "https://wallpapers.com/images/featured/imagens-de-carros-em-4k-g6a4f0e15hkua5oa.jpg",
  ],
  infractions: [
    {
      location: "Av. Paulista, 1000",
      datetime: "2024-03-20 14:30",
      reason: "Estacionamento em local proibido",
      image:
        "https://wallpapers.com/images/hd/4k-red-car-with-sunlight-at-forest-yv4lcxhpv99ide9a.jpg",
    },
    {
      location: "Rua Augusta, 500",
      datetime: "2024-03-19 16:45",
      reason: "Estacionamento em faixa de pedestres",
      image:
        "https://wallpapers.com/images/featured/imagens-de-carros-em-4k-g6a4f0e15hkua5oa.jpg",
    },
  ],
};

export default function Search() {
  const [plate, setPlate] = useState("");
  const [searchResult, setSearchResult] = useState<
    typeof mockInfraction | null
  >(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de busca
    setSearchResult(mockInfraction);
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Consulta de Infrações
        </h1>

        <Card className="p-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="plate">Placa do Veículo</Label>
              <Input
                id="plate"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                placeholder="ABC1234"
                className="mt-1"
                maxLength={7}
              />
            </div>
            <Button type="submit" className="self-end">
              Buscar
            </Button>
          </form>
        </Card>

        {searchResult && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Imagens do Veículo - Placa {searchResult.plate}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResult.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Infração ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg cursor-pointer"
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Detalhes das Infrações
              </h2>
              <div className="space-y-4">
                {searchResult.infractions.map((infraction, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-[3fr_2fr] p-4 bg-gray-50 rounded-lg items-center"
                  >
                    <div className="flex flex-col justify-center">
                      <p className="font-medium">
                        Local: {infraction.location}
                      </p>
                      <p>Data/Hora: {infraction.datetime}</p>
                      <p>Motivo: {infraction.reason}</p>
                    </div>
                    <div className="flex justify-end">
                      <img
                        src={infraction.image}
                        alt={`Infração ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg cursor-pointer max-w-xs"
                        onClick={() => handleImageClick(infraction.image)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Modal para exibir a imagem em tamanho maior */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeModal} // Adiciona o evento de clique para fechar a modal
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Imagem Ampliada"
              className="max-w-[80vw] max-h-[80vh] object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-md"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
