"use client";

import { useState } from "react";
import { Spot } from "../action";
import SpotList from "./SpotList";
import SpotForm from "./SpotForm";

interface SpotsContentProps {
  initialSpots: Spot[];
}

export default function SpotsContent({ initialSpots }: SpotsContentProps) {
  const [showForm, setShowForm] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  const handleAddSpot = () => {
    setSelectedSpot(null);
    setShowForm(true);
  };

  const handleSpotClick = (spot: Spot) => {
    setSelectedSpot(spot);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedSpot(null);
  };

  return (
    <>
      {showForm ? (
        <SpotForm spot={selectedSpot} onCancel={handleCancel} />
      ) : (
        <SpotList
          spots={initialSpots}
          loading={false}
          onAddSpot={handleAddSpot}
          onSpotClick={handleSpotClick}
        />
      )}
    </>
  );
}
