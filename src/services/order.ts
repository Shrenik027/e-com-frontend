import API from "@/services/api";
import type { Order, OrdersResponse } from "@/services/types/order";

export const getMyOrders = async (): Promise<Order[]> => {
  const res = await API.get<OrdersResponse>("/orders/me");
  return Array.isArray(res.data.orders) ? res.data.orders : [];
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  if (!orderId || orderId.length !== 24) {
    throw new Error("Invalid order ID");
  }
  const res = await API.get<Order>(`/orders/${orderId}`);
  return res.data;
};
