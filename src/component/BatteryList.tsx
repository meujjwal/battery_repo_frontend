// src/components/BatteryList.tsx
import React, { useState, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaDown,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from 'react-spinners';
import Button from "./Button";
import Battery from "../types/battery";
import UpdateBattriesModal from "../modalbox/LoadBatteriesModal";

interface BatteryListProps {
  batteries: Battery[];
  onDelete: (id: string) => void;
  onBatteryUpdated: () => void;
  setBatteries: (batteries: Battery[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const BatteryList: React.FC<BatteryListProps> = ({
  batteries,
  onDelete,
  onBatteryUpdated,
  setBatteries,
  loading,
  setLoading,
}) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedBattery, setSelectedBattery] = useState<Battery | null>(null);
  const [sortByAlphabet, setSortByAlphabet] = useState(false);
    
  const sortedBatteries = useMemo(() => {
    if (sortByAlphabet) {
      return [...batteries].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return batteries;
    }
  }, [batteries, sortByAlphabet]);

  const handleUpdate = (id: string) => {
    const batteryToUpdate = batteries.find((battery) => battery._id === id);
    if (batteryToUpdate) {
      setSelectedBattery(batteryToUpdate);
      setOpenUpdateModal(true);
    }
  };

  const handleDelete = (id: string) => {
    // Ask for confirmation before deleting
    const confirmed = window.confirm(
      "Are you sure you want to delete this battery?"
      );
      setLoading(true);

    if (confirmed) {
      // User confirmed, proceed with deletion
      onDelete(id);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto my-8 p-4">
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <ClipLoader size={35} color={'#123abc'} loading={loading} />
          {/* You can replace "Loading..." with an actual spinner component */}
        </div>
      ) : batteries.length === 0 ? (
        <div className="text-center text-gray-600 text-xl">
          No batteries found. Please create a new battery.
        </div>
      ) :  (
        <>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="sortByName"
              checked={sortByAlphabet}
              onChange={() => setSortByAlphabet(!sortByAlphabet)}
              className="mr-2"
            />
            <label htmlFor="sortByName" className="text-gray-700 font-semibold">
              <FontAwesomeIcon icon={faSortAlphaDown} className="mr-2" />
              Sort by name
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedBatteries.map((battery) => (
              <div
                key={battery._id}
                className="bg-white p-4 rounded shadow-md hover:shadow-lg transition duration-300 cursor-pointer border-t-2 border-gray-200"
              >
                <div className="flex flex-col">
                  <div className="text-lg font-semibold mb-2">
                    {battery.name}
                  </div>
                  <div className="text-sm text-gray-600 my-2">
                    <span className="font-semibold">PostCode:</span>{" "}
                    {battery.postCode + ""}
                  </div>
                  <div className="text-sm text-gray-600 my-2">
                    <span className="font-semibold">WattCapacity:</span>{" "}
                    {battery.wattCapacity}W
                  </div>
                </div>
                <div className="flex gap-4   mt-4">
                  <Button
                    label={<FontAwesomeIcon icon={faPencilAlt} />}
                    onClick={() => handleUpdate(battery._id!)}
                    buttonClass="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded"
                  />
                  <Button
                    label={<FontAwesomeIcon icon={faTrash} />}
                    onClick={() => handleDelete(battery._id!)}
                    buttonClass="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {openUpdateModal && (
        <UpdateBattriesModal
          open={openUpdateModal}
          onClose={() => {
            setSelectedBattery(null);
            setOpenUpdateModal(false);
          }}
          onBatteryUpdated={onBatteryUpdated}
          currentBattery={selectedBattery}
          setBatteries={setBatteries}
        />
      )}
    </div>
  );
};

export default BatteryList;
