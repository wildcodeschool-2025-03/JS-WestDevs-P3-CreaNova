import { Link, useParams } from "react-router";
import "./EditArtworkPage.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

function EditArtworkPage() {
  const [artwork, setArtwork] = useState<Artwork>();
  const { isLogged } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const { userId, artworkId } = useParams();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetch(`http://localhost:3310/api/artist/${userId}/artworks/${artworkId}`)
      .then((res) => res.json())
      .then((data) => {
        const artworkData = data[0];
        setArtwork(artworkData);
        setForm({
          title: artworkData?.title,
          description: artworkData?.description,
          price: artworkData?.price,
          image: artworkData?.image,
        });
      });
  }, [userId, artworkId]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:3310/api/artwork/${artworkId}`, {
      credentials: "include",
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Oeuvre modifiée !");
        fetch(
          `http://localhost:3310/api/artist/${userId}artworks/${artworkId}`,
          {
            credentials: "include",
          },
        )
          .then((res) => res.json())
          .then((data) => {
            const artworkData = data[0];
            setArtwork(artworkData);
            setForm({
              title: artworkData?.title,
              description: artworkData?.description,
              price: artworkData?.price,
              image: artworkData?.image,
            });
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
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleOnChange}
            />

            <label htmlFor="description"> Description de l'oeuvre</label>
            <input
              id="description"
              type="text"
              name="description"
              value={form.description}
              onChange={handleOnChange}
            />

            <label htmlFor="price"> Tarif:</label>
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleOnChange}
            />

            <label htmlFor="image"> Image URL:</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleOnChange}
            />

            <button type="submit">Modifier</button>
          </form>
        </section>
      </main>
      <ToastContainer />
    </>
  );
}

export default EditArtworkPage;
