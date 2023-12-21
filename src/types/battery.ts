import Statistics from "./statistics";

interface Battery {
  _id?: string;
  name: string;
  postCode: number;
  wattCapacity: number;
  
}

export interface BatteryResponseModel{
  batteries:Battery[],
  statistics:Statistics,
}

export default Battery;