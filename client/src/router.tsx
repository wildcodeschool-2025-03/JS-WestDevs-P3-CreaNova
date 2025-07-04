import { createBrowserRouter } from "react-router";
import App from "./App";
import ArtistDetailsPage from "./pages/ArtistDetailsPage/ArtistDetailsPage";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFound from "./pages/Notfound/Notfound";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
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
        element: <GalleryPage />,
        path: "/galleryPage",
      },
      {
        element: <NotFound />,
        path: "*",
      },
      {
        element: <CollectionPage />,
        path: "collection",
      },
    ],
  },
]);

export default router;
