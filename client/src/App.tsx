import { Outlet } from "react-router";
import "./global.css";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
