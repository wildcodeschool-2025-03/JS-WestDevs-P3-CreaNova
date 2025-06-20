import { Outlet } from "react-router";
import Footer from "./components/Footer";
import "./global.css";

function App() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
