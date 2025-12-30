"use client";

import { Spot } from "../action";

interface SpotListProps {
  spots: Spot[];
  loading: boolean;
  onAddSpot: () => void;
  onSpotClick: (spot: Spot) => void;
}

export default function SpotList({
  spots,
  loading,
  onAddSpot,
  onSpotClick,
}: SpotListProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">Spots</h2>
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-center py-8">Loading spots...</div>
        ) : spots.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No spots found. Add your first spot!
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {spots.map((spot) => (
              <div
                key={spot.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onSpotClick(spot)}
              >
                <h3 className="font-semibold text-lg mb-1">{spot.name}</h3>
                {spot.desc && (
                  <p className="text-gray-600 text-sm mb-2">{spot.desc}</p>
                )}
                <div className="text-xs text-gray-500">
                  <p>
                    Location: {spot.latitude}, {spot.longitude}
                  </p>
                  {spot.businessHours && spot.businessHours.length > 0 && (
                    <p className="mt-1">
                      Hours: {spot.businessHours.length} day(s)
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={onAddSpot}
          className="primary-btn h-10 px-3 w-full"
        >
          Add Spot
        </button>
      </div>
    </>
  );
}
