// src/components/Home.tsx
import React, { useState } from 'react';
import Features from '../component/Features';

export const Home = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [averageWattCapacity, setAverageWattCapacity] = useState(0);
  const [totalWattCapacity, setTotalWattCapacity] = useState(0);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-semibold">Virtual Power Plant System - Battery Module</h1>
        </div>  
      </header>

      <main className="container mx-auto my-8">
        <Features
          setTotalCount={setTotalCount}
          setAverageWattCapacity={setAverageWattCapacity}
          setTotalWattCapacity={setTotalWattCapacity}
        />

        <div className="bg-gray-200 p-8 rounded-md shadow-md mt-4">
          <div className="text-xl text-gray-700 mb-4">Battery Statistics:</div>
          <div className="flex flex-col items-center space-y-4">
            <div className="text-lg text-gray-800">Total Batteries: {totalCount}</div>
            <div className="text-lg text-gray-800">Average Watt Capacity: {averageWattCapacity} W</div>
            <div className="text-lg text-gray-800">Total Watt Capacity: {totalWattCapacity} W</div>
          </div>
        </div>
      </main>
    </div>
  );
};

// export default Home;
