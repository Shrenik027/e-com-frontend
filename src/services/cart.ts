import API from "./api";

export const getCart = async () => {
  const res = await API.get("/cart");
  return res.data.cart;
};

export const updateCartItem = async (itemId: string, quantity: number) => {
  const res = await API.put(`/cart/items/${itemId}`, { quantity });
  return res.data.cart;
};

export const removeCartItem = async (itemId: string) => {
  const res = await API.delete(`/cart/items/${itemId}`);
  return res.data.cart;
};

export const clearCart = async () => {
  const res = await API.delete("/cart");
  return res.data.cart;
};
export const applyCoupon = async (code: string) => {
  const res = await API.post("/cart/apply-coupon", { code });
  return res.data.cart;
};

export const removeCoupon = async () => {
  const res = await API.post("/cart/remove-coupon");
  return res.data.cart;
};

export const applyShipping = async (shippingMethodId: string) => {
  const res = await API.post("/cart/apply-shipping", {
    shippingMethodId,
  });
  return res.data.cart;
};
