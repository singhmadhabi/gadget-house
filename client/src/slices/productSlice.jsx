import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getById, list } from "../services/products";

const initialState = {
  products: [],
  product: {},
  total: 0,
  limit: 12,
  currentPage: 1,
  error: "",
  loading: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit, page }) => {
    const res = await list(limit, page);
    return res.data;
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id) => {
    const res = await getById(id);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.currentPage = 1;
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data.total;
        state.products = action.payload.data.data;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setLimit } = productSlice.actions;

export const productReducer = productSlice.reducer;