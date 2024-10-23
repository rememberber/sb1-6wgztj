import React, { useState } from 'react';
import { Utensils, MapPin, History } from 'lucide-react';
import { NextUIProvider, Button, Card, CardBody, CardHeader, Chip, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/react';

const restaurants = {
  building1: {
    B: [2, 3, 4, 5, 6],
    D: [3, 4],
    F: [3, 4, 5]
  },
  building2: {
    A: [3, 4, 5],
    B: [3, 4, 5],
    C: [3, 4]
  }
};

function App() {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getRandomRestaurant = () => {
    const building = Math.random() < 0.5 ? 'building1' : 'building2';
    const buildingName = building === 'building1' ? '一' : '二';
    const seats = restaurants[building];
    const seatKeys = Object.keys(seats);
    const randomSeat = seatKeys[Math.floor(Math.random() * seatKeys.length)];
    const floors = seats[randomSeat];
    const randomFloor = floors[Math.floor(Math.random() * floors.length)];
    return `${buildingName}号楼 ${randomSeat}座 ${randomFloor}F`;
  };

  const handleRecommend = () => {
    const newRecommendation = getRandomRestaurant();
    setRecommendation(newRecommendation);
    setHistory(prev => [newRecommendation, ...prev.slice(0, 9)]);
  };

  return (
    <NextUIProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white/70 backdrop-blur-md">
          <CardHeader className="flex flex-col items-center gap-2 pb-0">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              去哪吃
            </h1>
            <Utensils className="w-12 h-12 text-blue-500" />
          </CardHeader>
          <CardBody className="flex flex-col items-center gap-4">
            <Button
              onPress={handleRecommend}
              color="primary"
              size="lg"
              className="w-full font-semibold"
              startContent={<MapPin />}
            >
              随机推荐
            </Button>

            {recommendation && (
              <Card className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-xl">
                <CardBody>
                  <div className="text-center text-white">
                    <p className="text-sm mb-2">今天的推荐地点是：</p>
                    <p className="text-3xl font-bold">{recommendation}</p>
                  </div>
                </CardBody>
              </Card>
            )}

            {history.length > 0 && (
              <Tooltip content="查看历史记录">
                <Button
                  onPress={onOpen}
                  isIconOnly
                  variant="light"
                  className="absolute bottom-4 right-4"
                >
                  <History className="w-5 h-5" />
                </Button>
              </Tooltip>
            )}
          </CardBody>
        </Card>

        <Modal isOpen={isOpen} onClose={onClose} size="sm">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">历史推荐</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2 pb-4">
                {history.map((place, index) => (
                  <Chip
                    key={index}
                    variant="flat"
                    color={index === 0 ? "primary" : "default"}
                    className="w-full justify-center"
                  >
                    {place}
                  </Chip>
                ))}
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </NextUIProvider>
  );
}

export default App;