import Footer from "./components/Footer";
import { Outlet } from "react-router";
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
