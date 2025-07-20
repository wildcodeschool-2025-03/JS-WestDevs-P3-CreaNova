import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import "./EditArtworkPage.css";

function EditArtworkPage() {
  const [artwork, setArtwork] = useState<Artwork>();
  const { isLogged } = useAuth();

  const { userId, artworkId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3310/api/artist/${userId}/artworks/${artworkId}`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data[0]);
      });
  }, [userId, artworkId]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3310/api/artwork/${artworkId}`, {
      credentials: "include",
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Oeuvre modifiée !");
        fetch(
          `http://localhost:3310/api/artist/${userId}/artworks/${artworkId}`,
          {
            credentials: "include",
          },
        )
          .then((res) => res.json())
          .then((data) => {
            setArtwork(data[0]);
          });
      });
  };

  if (!artwork) {
    return (
      <main className="place-items">
        <Link to="/">
          <h1>Vous n'avez pas d'oeuvre qui possède cet identifiant.</h1>
        </Link>
      </main>
    );
  }
  if (!isLogged) {
    return (
      <main className="link-login">
        <section>
          <p>Vous devez être connecté pour accéder à cette page.</p>
          <Link to="/login">
            <button type="button">Accéder à la page de connexion</button>
          </Link>
        </section>
      </main>
    );
  }
  return (
    <>
      <main className="edit-artwork-page">
        <section>
          <h1>Modifier l'oeuvre</h1>
          <form className="form" onSubmit={handleOnSubmit}>
            <label htmlFor="title"> Titre de l'oeuvre </label>
            <input type="text" name="title" defaultValue={artwork.title} />
            <label htmlFor="description"> Description de l'oeuvre</label>
            <textarea
              id="description"
              name="description"
              defaultValue={artwork.description}
            />
            <label htmlFor="price"> Tarif:</label>
            <input type="text" name="price" defaultValue={artwork.price} />
            <label htmlFor="image"> Image URL:</label>
            <input type="text" name="image" defaultValue={artwork.image} />
            <button type="submit">Modifier</button>
          </form>
        </section>
      </main>
      <ToastContainer />
    </>
  );
}

export default EditArtworkPage;
