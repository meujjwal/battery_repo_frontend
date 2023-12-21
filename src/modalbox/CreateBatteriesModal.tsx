import React, { useState } from "react";
import Battery from "../types/battery";
import { postBattery } from "../api/battery";

export interface ModalBoxProps {
  onClose: () => void;
  open: boolean;
  onBatteryCreated: () => void; // Callback function to refresh battery list
}

const CreateBatteriesModal: React.FC<ModalBoxProps> = ({
  onClose,
  open,
  onBatteryCreated,
}) => {
  const [error, setError] = useState<String>("");
  const [newBattery, setNewBattery] = useState<Battery>({
    name: "",
    postCode: 0,
    wattCapacity: 0,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBattery({
      ...newBattery,
      [e.target.name]: e.target.value,
    });
  };
  const handlePostCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewBattery({
      ...newBattery,
      postCode: value === "" ? 0 : parseInt(value),
    });
  };
  const handleWattCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewBattery({
      ...newBattery,
      wattCapacity: value === "" ? 0 : parseInt(value),
    });
  };
  const handleCreate = async () => {
    if (
      newBattery.name === "" ||
      newBattery.postCode ==0 ||
      newBattery.wattCapacity ==0
    ) {
      setError("Please fill in all the fields");
      return;
    }
    if(newBattery.postCode < 0 || newBattery.wattCapacity < 0){
      setError("Please fill in the positive values");
      return;
    }
    const response = await postBattery(newBattery);
    if (response.success) {
      onClose();
      setNewBattery({
        name: "",
        postCode: 0,
        wattCapacity: 0,
      });
      setError("");
      onBatteryCreated();
    } else {
      console.log(response.message);
    }
  };

  return (
    <>
      {open && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Add Batteries
                      </h3>
                      <div className="mt-2">
                        <div className="mt-7">
                          <div className="flex flex-col items-start  gap-2 w-full">
                            <div className="flex justify-between w-full">
                              <div>Name:</div>
                              <input
                                type="text"
                                name="name"
                                value={newBattery.name}
                                onChange={handleInputChange}
                                className=" border-2 border-gray-200 rounded-md ml-3"
                              />
                            </div>
                            <div className="flex justify-between w-full">
                              <div>Postcode:</div>
                              <input
                                type="number"
                                name="postcode"
                                value={newBattery.postCode}
                                onChange={handlePostCodeChange}
                                className=" border-2 border-gray-200 rounded-md ml-3"
                              />
                            </div>
                            <div className="flex justify-between w-full">
                              <div>Watt Capacity:</div>
                              <input
                                type="number"
                                name="wattCapacity"
                                value={newBattery.wattCapacity}
                                onChange={handleWattCapacityChange}
                                className=" border-2 border-gray-200 rounded-md ml-3"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleCreate}
                  >
                    Add Batteries
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
                {error && (
                  <div className="text-red-500 text-center">{error}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBatteriesModal;
