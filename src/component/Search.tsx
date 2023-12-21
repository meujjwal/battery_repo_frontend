// src/components/Search.tsx
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Battery from "../types/battery";
import { deleteBattery, getBatteries } from "../api/battery";
import BatteryList from "./BatteryList";

interface SearchProps {
  batteries: Battery[];
  setBatteries: (batteries: Battery[]) => void;
  onBatteryUpdated: () => void;
}

const Search: React.FC<SearchProps> = ({
  batteries,
  setBatteries,
  onBatteryUpdated,
}) => {
  const [search, setSearch] = useState("");
  const [maxPostCode, setMaxPostCode] = useState<number | undefined>();
  const [minPostCode, setMinPostCode] = useState<number | undefined>();
  const [searchIconClicked, setSearchIconClicked] = useState(false);

  const handleClick = async () => {
    if (minPostCode! > maxPostCode!) {
      alert("Max post code should be greater than min post code");
      return;
    }
    const data = await getBatteries({ search, maxPostCode, minPostCode });
    setBatteries([...data] as Battery[]);
    setSearchIconClicked(true);
  };

  const handleDelete = async (id: string) => {
    await deleteBattery(id);
    const updatedBatteries = await getBatteries({});
    setBatteries(updatedBatteries);
    setSearchIconClicked(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 max-w-xs">
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex-1 max-w-xs">
          <input
            type="number"
            name="minPostCode"
            id="minPostCode"
            value={minPostCode}
            onChange={(e) => setMinPostCode(parseInt(e.target.value, 10))}
            placeholder="Min Post Code"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex-1 max-w-xs">
          <input
            type="number"
            name="maxPostCode"
            id="maxPostCode"
            value={maxPostCode}
            onChange={(e) => setMaxPostCode(parseInt(e.target.value, 10))}
            placeholder="Max Post Code"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <button
            className="bg-gray-200 rounded-lg px-4 py-2"
            onClick={handleClick}
          >
          <CiSearch className="text-blue-500 text-2xl" />
          </button>
        </div>
      </div>
      <div>
        {searchIconClicked && (
          <BatteryList
            batteries={batteries}
            onDelete={handleDelete}
            onBatteryUpdated={onBatteryUpdated}
            setBatteries={setBatteries}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
