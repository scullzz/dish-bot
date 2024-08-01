import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    orderList: [],
    list: [],
    price: 0,
  },
  reducers: {
    createOrder: (state) => {
      state.orderList = state.list.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));
    },
    addItem: (state, action) => {
      const item = { ...action.payload, quantity: 1 };
      state.list.push(item);
      state.price += item.price;
    },
    increase: (state, action) => {
      const item = state.list.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        state.price += item.price;
      }
    },
    decrease: (state, action) => {
      const item = state.list.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity -= 1;
        state.price -= item.price;
        if (item.quantity === 0) {
          state.list = state.list.filter((i) => i.id !== item.id);
        }
      }
    },
    deleteItem: (state, action) => {
      const itemIndex = state.list.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        const item = state.list[itemIndex];
        state.price -= item.price * item.quantity;
        state.list.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.list = [];
      state.price = 0;
    },
  },
});

export const {
  addItem,
  deleteItem,
  clearCart,
  createOrder,
  increase,
  decrease,
} = itemsSlice.actions;
export default itemsSlice;