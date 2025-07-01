import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import "./global.css";
import Header from "./components/Header/Header";

function App() {
  const location = useLocation();
  const isVisible =
    location.pathname === "/login" ||
    location.pathname === "/registration" ||
    location.pathname === "/notfound";

  return (
    <>
      {!isVisible && <Header />}
      <Outlet />
      {!isVisible && <Footer />}
    </>
  );
}

export default App;
