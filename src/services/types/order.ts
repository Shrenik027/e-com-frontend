// src/services/types/order.ts

/* ===========================
   ORDER ITEM
=========================== */
export interface OrderItem {
  product: string | null; // ObjectId as string (or null if not populated)
  name: string;
  price: number;
  quantity: number;
  total: number;
}

/* ===========================
   ADDRESS
=========================== */
export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

/* ===========================
   ORDER
=========================== */
export interface Order {
  _id: string;
  user: string;

  items: OrderItem[];
  address: Address;

  subtotal: number;
  discount: number;
  shipping: number;
  total: number;

  couponCode: string | null;

  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "placed" | "confirmed" | "shipped" | "delivered" | "cancelled";

  createdAt: string;
  updatedAt: string;
}

/* ===========================
   API RESPONSES
=========================== */
export interface OrdersResponse {
  count: number;
  orders: Order[];
}
