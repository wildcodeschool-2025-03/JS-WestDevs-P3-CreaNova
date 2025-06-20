import { createBrowserRouter } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <HomePage />,
        path: "/",
      },
      {
        element: <RegistrationPage />,
        path: "/registration",
      },
    ],
  },
]);

export default router;
