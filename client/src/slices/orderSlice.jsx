import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { create } from "../services/orders";

const initialState = {
  orders: [],
  order: {},
  total: 0,
  currentPage: 1,
  error: "",
  loading: false,
};

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (payload) => {
    const res = await create(payload);
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;