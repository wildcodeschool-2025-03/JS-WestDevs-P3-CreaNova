import { createBrowserRouter } from "react-router";
import App from "./App";
import ArtistDetailsPage from "./pages/ArtistDetailsPage/ArtistDetailsPage";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
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
        element: <LoginPage />,
        path: "/login",
      },
      {
        element: <ArtistPage />,
        path: "/artist",
      },
      {
        element: <ArtistDetailsPage />,
        path: "/artist/:id",
      },
    ],
  },
]);

export default router;
