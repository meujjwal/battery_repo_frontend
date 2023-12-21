
import axiosInstance from "./axiosInstance";
import Battery, { BatteryResponseModel } from "../types/battery";
import ApiResponse from "../types/apiresponse";
import Statistics from "../types/statistics";

interface BatteryUpdateData {
    // Define the properties you want to update
    name?: string;
    postCode?: Number;
    wattCapacity?: number;
}

interface BatterySearchParams {
    search?: string;
    minPostCode?: number;
    maxPostCode?: number;
}

export const getBatteries = async (search: BatterySearchParams): Promise<Battery[]> => {
    // console.log(search);
    const response = await axiosInstance.get<BatteryResponseModel>(`/batteries`, {
        params: search
    });
    // console.log(response.data.batteries);
    return response.data.batteries;
};


export const getStatistics = async (): Promise<Statistics> => {
    const response = await axiosInstance.get<BatteryResponseModel>(`/batteries/`);
    return response.data.statistics;
}

export const postBattery = async (data: Battery): Promise<ApiResponse> => {
    const response = await axiosInstance.post(`/batteries/`, data);
    return response.data;
};

export const deleteBattery = async (id: string): Promise<Battery> => {
    if (!id) throw new Error("id is required");
    const response = await axiosInstance.delete(`/batteries/${id}`);
    return response.data;
}

export const updateBattery = async (id: string, data: BatteryUpdateData): Promise<ApiResponse> => {
    if (!id) throw new Error("id is required");
    const response = await axiosInstance.put(`/batteries/${id}`, data);
    return response.data;
}

