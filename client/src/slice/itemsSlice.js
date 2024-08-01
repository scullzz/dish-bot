import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    orderList: [{}],
    list: [{}],
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
      state.list.push({ ...action.payload, quantity: 1 });
      state.price += action.payload.price;
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
          state.list = state.list.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
    deleteItem: (state, action) => {
      const index = state.list.findIndex(
        (item) => item.title === action.payload.title
      );
      if (index !== -1) {
        state.price -= state.list[index].price;
        state.list.splice(index, 1);
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
