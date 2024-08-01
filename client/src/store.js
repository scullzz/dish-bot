import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./slice/itemsSlice";
export default configureStore({
  reducer: {
    [itemsSlice.name]: itemsSlice.reducer,
  },
});
