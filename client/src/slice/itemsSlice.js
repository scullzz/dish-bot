import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [{}],
    price: 0,
  },
  reducers: {
    addItem: (state, action) => {
      state.list.push(action.payload);
      state.price += action.payload.price;
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

export const { addItem, deleteItem, clearCart } = itemsSlice.actions;
export default itemsSlice;
