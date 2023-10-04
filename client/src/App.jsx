import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default function App() {
  return (
    <>
      <div className="d-flex flex-column h-100vh">
        <Navbar />
        <main className="flex-shrink-0">
          <div className="container">
      <RouterProvider router={router} />
      </div>
        </main>
        <Footer />
      </div>
    </>
  );
}