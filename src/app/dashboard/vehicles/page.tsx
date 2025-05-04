"use client";

import { Card } from "@/src/components/ui/card";
import { useState } from "react";

// Dados simulados de infração
const mockInfraction = {
  infractions: [
    {
      plate: "ABC1234",
      location: "Av. Paulista, 1000",
      datetime: "2024-03-20 14:30",
      reason: "Estacionamento em local proibido",
      image:
        "https://wallpapers.com/images/hd/4k-red-car-with-sunlight-at-forest-yv4lcxhpv99ide9a.jpg",
    },
    {
      plate: "ABC1234",
      location: "Rua Augusta, 500",
      datetime: "2024-03-19 16:45",
      reason: "Estacionamento em faixa de pedestres",
      image:
        "https://wallpapers.com/images/featured/imagens-de-carros-em-4k-g6a4f0e15hkua5oa.jpg",
    },
  ],
};

export default function Search() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Infrações Enviadas</h2>
            <div className="space-y-4">
              {mockInfraction.infractions.map((infraction, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-[3fr_2fr] p-4 bg-gray-50 rounded-lg items-center"
                >
                  <div className="flex flex-col justify-center">
                    <p className="font-medium">Local: {infraction.location}</p>
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
