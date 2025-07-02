import { createBrowserRouter } from "react-router";
import App from "./App";
import ArtistDetailsPage from "./pages/ArtistDetailsPage/ArtistDetailsPage";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import GalleryPagePhotos from "./pages/GalleryPage/GalleryPagePhotos";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import UserFormPage from "./pages/UserFormPage/UserFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <HomePage />,
        path: "",
      },
      {
        element: <RegistrationPage />,
        path: "registration",
      },
      {
        element: <LoginPage />,
        path: "login",
      },
      {
        element: <ArtistPage />,
        path: "artist",
      },
      {
        element: <ArtistDetailsPage />,
        path: "/artist/:id",
      },
      {
        element: <GalleryPagePhotos />,
        path: "/gallery_page_photo",
      },
      {
        element: <UserFormPage />,
        path: "user_form",
      },
    ],
  },
]);

export default router;
