import NavBar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="">
      <NavBar />
      <main className="flex-shrink-0 d-flex flex-column min-vh-100">
        <div className="container mt-2 mb-5">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}