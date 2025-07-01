import { createBrowserRouter } from "react-router";
import App from "./App";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFound from "./pages/Notfound/Notfound";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFound />,
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
        element: <NotFound />,
        path: "/*",
      },
    ],
  },
]);

export default router;
