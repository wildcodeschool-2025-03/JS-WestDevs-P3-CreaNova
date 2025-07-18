import { createBrowserRouter } from "react-router";
import App from "./App";
import AboutPage from "./pages/AboutPage/AboutPage";
import AddArtworkPage from "./pages/AddArtworkPage/AddArtworkPage";
import ArtistArtworkDetailPage from "./pages/ArtistArtworkDetailPage/ArtistArtworkDetailPage";
import ArtistDetailsPage from "./pages/ArtistDetailsPage/ArtistDetailsPage";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import ArtworkDetailPage from "./pages/ArtworkDetailPage/ArtworkDetailPage";
import CartPage from "./pages/CartPage/CartPage";
import CgvPage from "./pages/CgvPage/CgvPage";
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import EditArtworkPage from "./pages/EditArtworkPage/EditArtworkPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
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
        path: "/gallery/:categoryName",
      },
      {
        element: <CollectionPage />,
        path: "collection/:id",
      },
      {
        element: <ArtworkDetailPage />,
        path: "artwork/:id",
      },
      {
        element: <EditArtworkPage />,
        path: "artist/:userId/artworks/:artworkId/edit",
      },
      {
        element: <AddArtworkPage />,
        path: "artist/:userId/add-artwork",
      },
      {
        element: <ArtistArtworkDetailPage />,
        path: "artist/:userId/artwork/:artworkId",
      },
      {
        element: <UserFormPage />,
        path: "user-form",
      },
      {
        element: <FavoritePage />,
        path: "/favorite/:userId",
      },
      {
        element: <CgvPage />,
        path: "cgv",
      },
      {
        element: <AboutPage />,
        path: "about",
      },
      {
        element: <CartPage />,
        path: "panier",
      },
    ],
  },
  {
    element: <NotFound />,
    path: "*",
  },
]);

export default router;
