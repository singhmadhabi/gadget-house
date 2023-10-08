import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // if item exist
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
        state.quantity++;
      } else {
        // new item
        state.cart.push(action.payload);
        state.quantity++;
      }
    },
    removeItem: (state, action) => {
      const newItems = state.cart.filter((item) => item.id !== action.payload);
      state.cart = newItems;
      state.quantity = newItems.reduce(
        (acc, object) => acc + object.quantity,
        0
      );
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        existingItem.quantity++;
        state.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const exisitingItem = state.cart.find(
        (item) => item.id === action.payload
      );
      if (exisitingItem.quantity === 1) {
        exisitingItem.quantity = 1;
      } else {
        exisitingItem.quantity--;
        state.quantity--;
      }
    },
  },
});

export const { addToCart, removeItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;