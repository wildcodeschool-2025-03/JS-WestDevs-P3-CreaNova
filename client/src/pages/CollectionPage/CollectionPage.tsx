import { useEffect, useState } from "react";
import "./CollectionPage.css";
import { Link, useParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";

function CollectionPage() {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const { id } = useParams();
  const { isLogged } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:3310/api/artist/${id}/artworks`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data);
      });
  }, [id]);

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

  if (!Array.isArray(artwork) || artwork.length === 0) {
    return (
      <main className="place-items">
        <h1>
          Vous n'avez aucune oeuvre ou vous n'avez pas accès à cette collection
        </h1>
      </main>
    );
  }

  return (
    <main className="collection-page-main">
      <Link to={`/artist/${id}/add-artwork`} className="add-artwork-link">
        Ajouter
      </Link>
      <h1>Ma collection</h1>
      {artwork.map((item) => (
        <figure key={item.id}>
          <Link to={`/artist/${id}/artwork/${item.id}`}>
            <img src={item.image} alt={item.title} />
            <figcaption>{item.title}</figcaption>
          </Link>
        </figure>
      ))}
    </main>
  );
}

export default CollectionPage;
