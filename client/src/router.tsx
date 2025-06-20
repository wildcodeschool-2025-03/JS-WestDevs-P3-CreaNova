import { createBrowserRouter } from "react-router";
import App from "./App";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
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
      {
        element: <ArtistPage />,
        path: "/artist",
      },
    ],
  },
]);

export default router;
