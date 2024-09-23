// src/app/models/order.model.ts
export interface Order {

  items: { medicine_id: string; quantity: number }[];
  delivery_type: string;
  patient_name: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  auto_assign: boolean;
  chemist_id: string;
  latitude: string;
  longitude: string;
}

export interface OrderItem {
  medicine_id: string;
  quantity: number;
}
