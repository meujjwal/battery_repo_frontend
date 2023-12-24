// src/components/Features.tsx
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { getBatteries, deleteBattery, getStatistics } from "../api/battery";
import Battery from "../types/battery";
import BatteryList from "./BatteryList";
import Search from "./Search";
import CreateBatteriesModal from "../modalbox/CreateBatteriesModal";

interface FeaturesProps {
  setTotalCount: (count: number) => void;
  setAverageWattCapacity: (averageWattCapacity: number) => void;
  setTotalWattCapacity: (totalWattCapacity: number) => void;
}

const Features: React.FC<FeaturesProps> = ({
  setTotalCount,
  setAverageWattCapacity,
  setTotalWattCapacity,
}) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [listClicked, setListClicked] = useState(false);
  const [batteries, setBatteries] = useState<Battery[]>([]);
  const [searchClick, setSearchClick] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (listClicked) {
      fetchBatteries();
    }
  }, [listClicked]);

  useEffect(() => {
    // Update the state based on the fetched data
    fetchTotalCount();
  }, [batteries]);

  const onListClick = () => {
    setLoading(false);
    setListClicked(true);
    setLoading(false);
    setSearchClick(false);
    // No need to fetchBatteries here, it will be triggered on the next useEffect
  };

  const onSearchClick = () => {
    setLoading(false);
    setSearchClick(true);
    setListClicked(false);
    // No need to fetchBatteries here, it will be triggered on the next useEffect
  };

  const fetchBatteries = async () => {
    if (!searchClick) {
      setLoading(true);
      const data = await getBatteries({});
      setBatteries(data);
      setLoading(false);
    }
  };

  const fetchTotalCount = async () => {
    try {
      const data = await getStatistics();
      setTotalCount(data.length);
      setAverageWattCapacity(data.averageWattCapacity);
      setTotalWattCapacity(data.totalWattCapacity);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteBattery(id);

    // Fetch the updated data
    const updatedBatteries = await getBatteries({});

    // Update the state
    setBatteries(updatedBatteries);
  };

  const handleBatteryCreated = () => {
    // Trigger a refresh of the battery list
    fetchBatteries();
  };

  const handleBatteryUpdated = () => {
    // Trigger a refresh of the battery list
    fetchBatteries();
  };
  return (
    <>
      <div className="flex justify-center space-x-4">
        <Button
          key="create"
          onClick={() => {
            setSearchClick(false);
            setListClicked(true);
            setOpenCreateModal(true);
          }}
          label="Create"
          buttonClass="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        />
        <Button
          key="listAll"
          label="List All"
          onClick={onListClick}
          buttonClass="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
        <Button
          key="search"
          label="Search"
          onClick={onSearchClick}
          buttonClass="bg-slate-500 hover.bg-slate-700 text-white font-bold py-2 px-4 rounded"
        />
        {openCreateModal && (
          <CreateBatteriesModal
            open={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
            onBatteryCreated={handleBatteryCreated}
          />
        )}
      </div>
      <div className="m-3">
        {searchClick && (
          <Search
            batteries={batteries}
            setBatteries={setBatteries}
            onBatteryUpdated={handleBatteryUpdated}
            loading={loading}
            setLoading={setLoading}
          />
        )}
        {listClicked && (
          <BatteryList
            batteries={batteries}
            onDelete={handleDelete}
            onBatteryUpdated={handleBatteryUpdated}
            setBatteries={setBatteries}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </div>
    </>
  );
};

export default Features;
