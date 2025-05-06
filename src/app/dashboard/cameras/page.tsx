"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

// Mock data for cameras
const mockCameras = [
  {
    id: "1",
    nickname: "Entrada Principal",
    ip: "192.168.1.100",
    password: "••••••••",
    serialNumber: "CAM123456",
    status: "online",
  },
  {
    id: "2",
    nickname: "Estacionamento A",
    ip: "192.168.1.101",
    password: "••••••••",
    serialNumber: "CAM789012",
    status: "offline",
  },
];

export default function Cameras() {
  const [cameras, setCameras] = useState(mockCameras);
  const [newCamera, setNewCamera] = useState({
    nickname: "",
    ip: "",
    password: "",
    serialNumber: "",
  });
  const [selectedCamera, setSelectedCamera] = useState<typeof mockCameras[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCamera({
      ...newCamera,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedCamera) {
      const updatedCamera = {
        ...selectedCamera,
        [e.target.name]: e.target.value,
      };
      setSelectedCamera(updatedCamera);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const camera = {
      id: Math.random().toString(),
      ...newCamera,
      status: "online",
    };
    setCameras([...cameras, camera]);
    setNewCamera({ nickname: "", ip: "", password: "", serialNumber: "" });
    setIsAddDialogOpen(false);
  };

  const handleSaveConfig = () => {
    if (selectedCamera) {
      setCameras(
        cameras.map((cam) =>
          cam.id === selectedCamera.id ? selectedCamera : cam
        )
      );
      setSelectedCamera(null);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteCamera = (id: string) => {
    setCameras(cameras.filter((cam) => cam.id !== id));
    setSelectedCamera(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Minhas Câmeras</h1>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Câmera
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Nova Câmera</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="nickname">Apelido</Label>
                  <Input
                    id="nickname"
                    name="nickname"
                    value={newCamera.nickname}
                    onChange={handleInputChange}
                    placeholder="Ex: Câmera Entrada"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ip">Endereço IP</Label>
                  <Input
                    id="ip"
                    name="ip"
                    value={newCamera.ip}
                    onChange={handleInputChange}
                    placeholder="Ex: 192.168.1.100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={newCamera.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Número de Série</Label>
                  <Input
                    id="serialNumber"
                    name="serialNumber"
                    value={newCamera.serialNumber}
                    onChange={handleInputChange}
                    placeholder="Ex: CAM123456"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Adicionar Câmera
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cameras.map((camera) => (
            <Card key={camera.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{camera.nickname}</h2>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>IP: {camera.ip}</p>
                    <p>Série: {camera.serialNumber}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          camera.status === "online" ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span className="capitalize">{camera.status}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCamera(camera);
                    setIsAddDialogOpen(false);
                    setIsDialogOpen(true);
                  }}
                >
                  Editar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedCamera && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="backdrop:bg-black/40 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle>Editar Câmera</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="config-nickname">Apelido</Label>
                <Input
                  id="config-nickname"
                  name="nickname"
                  value={selectedCamera.nickname}
                  onChange={handleConfigChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="config-ip">Endereço IP</Label>
                <Input
                  id="config-ip"
                  name="ip"
                  value={selectedCamera.ip}
                  onChange={handleConfigChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="config-password">Senha</Label>
                <Input
                  id="config-password"
                  name="password"
                  type="password"
                  value={selectedCamera.password}
                  onChange={handleConfigChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="config-serialNumber">Número de Série</Label>
                <Input
                  id="config-serialNumber"
                  name="serialNumber"
                  value={selectedCamera.serialNumber}
                  onChange={handleConfigChange}
                  required
                />
              </div>
              <div className="pt-4 flex justify-between">
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteCamera(selectedCamera.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir Câmera
                </Button>
                <Button variant="default" onClick={handleSaveConfig}>
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
