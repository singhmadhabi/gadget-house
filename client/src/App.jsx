import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import Home from "./pages/Home";

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
      <RouterProvider router={router} />
    </>
  );
}