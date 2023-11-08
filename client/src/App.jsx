import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/Routes";
// Layout
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";

// Default Routes
import About from "./pages/About";
import Cart from "./pages/Cart";
import { CheckoutPage } from "./components/CheckoutStatus";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

// Admin Routes
import Dashboard from "./pages/admin/Dashboard";
import {
  AddCategory,
  EditCategory,
  ListCategory,
} from "./pages/admin/categories";
import { AddProduct, EditProduct, ListProducts } from "./pages/admin/products";

export default function App() {
  return (
    <>
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/checkout/failed"
                element={
                  <CheckoutPage
                    type="failed"
                    msgHeader="Transaction Failed"
                    msg="Something went wrong. Try again."
                  />
                }
              />
              <Route path="/checkout/success" element={<CheckoutPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="*" element={<Error />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route
                index
                path="/admin/dashboard"
                element={<PrivateRoute role={""}>{<Dashboard />}</PrivateRoute>}
              />
              <Route
                path="/admin/products"
                element={
                  <PrivateRoute role="admin">{<ListProducts />}</PrivateRoute>
                }
              />
              <Route
                path="/admin/products/add"
                element={
                  <PrivateRoute role="admin">{<AddProduct />}</PrivateRoute>
                }
              />
              <Route
                path="/admin/products/:id"
                element={
                  <PrivateRoute role="admin">{<EditProduct />}</PrivateRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <PrivateRoute role="admin">{<ListCategory />}</PrivateRoute>
                }
              />
              <Route
                path="/admin/categories/add"
                element={
                  <PrivateRoute role="admin">{<AddCategory />}</PrivateRoute>
                }
              />
              <Route
                path="/admin/categories/:id"
                element={
                  <PrivateRoute role="admin">{<EditCategory />}</PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}