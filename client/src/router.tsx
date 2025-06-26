import { createBrowserRouter } from "react-router";
import App from "./App";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import GalleryPagePhotos from "./pages/GalleryPage/GalleryPagePhotos";
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
        element: <GalleryPagePhotos />,
        path: "/gallery_page_photo",
      },
    ],
  },
]);

export default router;
