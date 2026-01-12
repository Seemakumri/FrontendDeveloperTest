export interface WorkerType {
  id: number
  name: string
  service: string
  pricePerDay: number
  image: string
}


export interface ServiceType {
  name: string;
  count: number;
  averagePrice: number;
  priceRange: {
    min: number;
    max: number;
  };
}