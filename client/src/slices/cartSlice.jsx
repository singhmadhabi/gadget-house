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
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        if (existingItem.quantity < action.payload.quantity) {
          existingItem.quantity++;
          state.quantity++;
        }
      } else {
        // new item
        state.cart.push({ ...action.payload, quantity: 1 });
        state.quantity++;
      }
    },
    removeItem: (state, action) => {
      const newItems = state.cart.filter((item) => item._id !== action.payload);
      state.cart = newItems;
      state.quantity = newItems.reduce(
        (acc, object) => acc + object.quantity,
        0
      );
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload.id
      );

      const product = action.payload.products.find(
        (product) => product._id === existingItem._id
      );
      if (existingItem && existingItem.quantity < product?.quantity) {
        existingItem.quantity++;
        state.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const exisitingItem = state.cart.find(
        (item) => item._id === action.payload
      );
      if (exisitingItem.quantity === 1) {
        exisitingItem.quantity = 1;
      } else {
        exisitingItem.quantity--;
        state.quantity--;
      }
    },
    removeAll: (state) => {
      state.cart = [];
      state.quantity = 0;
    },
    updateCart: (state, action) => {
      console.log(action.payload);
      const { product, quantity } = action.payload;
      // if item exist
      const existingItem = state.cart.find((item) => item._id === product._id);
      if (existingItem) {
        if (existingItem.quantity < product.quantity) {
          if (quantity) {
            existingItem.quantity = existingItem.quantity + quantity;
            state.quantity = state.quantity + quantity;
          } else {
            existingItem.quantity++;
            state.quantity++;
          }
        }
      } else {
        if (quantity) {
          state.cart.push({ ...product, quantity: quantity });
          state.quantity = state.quantity + quantity;
        } else {
          state.cart.push({ ...product, quantity: 1 });
          state.quantity++;
        }
      }
    },
  },
});

export const {
  addToCart,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  removeAll,
  updateCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;