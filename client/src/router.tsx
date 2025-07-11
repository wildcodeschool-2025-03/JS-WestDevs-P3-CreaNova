import { createBrowserRouter } from "react-router";
import App from "./App";
import AddArtworkPage from "./pages/AddArtworkPage/AddArtworkPage";
import ArtistDetailsPage from "./pages/ArtistDetailsPage/ArtistDetailsPage";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import EditArtworkPage from "./pages/EditArtworkPage/EditArtworkPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFound from "./pages/Notfound/Notfound";
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
        element: <GalleryPage />,
        path: "/galleryPage",
      },
      {
        element: <CollectionPage />,
        path: "collection/:id",
      },
      {
        element: <EditArtworkPage />,
        path: "artist/:userId/artworks/:artworkId/edit",
      },
      {
        element: <AddArtworkPage />,
        path: "add-artwork",
      },
      {
        element: <UserFormPage />,
        path: "user-form",
      },
    ],
  },
  {
    element: <NotFound />,
    path: "*",
  },
]);

export default router;
