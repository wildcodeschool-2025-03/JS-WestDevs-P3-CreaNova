import { Link, useNavigate, useParams } from "react-router";
import "./ArtistArtworkDetailPage.css";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

function ArtistArtworkDetailPage() {
  const [artwork, setArtwork] = useState<Artwork>();
  const { isLogged } = useAuth();
  const { userId, artworkId } = useParams();
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3310/api/artist/${userId}/artworks/${artworkId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setArtwork(data[0]));
  }, [userId, artworkId]);

  const handleOnSubmit = () => {
    fetch(`http://localhost:3310/api/artworks/${artworkId}`, {
      credentials: "include",
      method: "delete",
    }).then((res) => {
      if (res.ok) {
        toast.success("Oeuvre supprimée avec succès !");
        timeoutRef.current = setTimeout(() => {
          navigate(`/collection/${userId}`);
        }, 2000);
      } else {
        toast.error("Il y a eu un problème lors de la suppression.");
      }
    });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!artwork || !artwork.id) {
    return (
      <main className="no-data">
        <h1>Vous n'avez pas d'oeuvre disponible ici.</h1>
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
      <main className="artist-artwork-detail-main">
        <h1>{artwork.title}</h1>
        <figure>
          <img
            src={`http://localhost:3310/${artwork.image}`}
            alt={artwork.title}
          />
          <figcaption>{artwork.title}</figcaption>
        </figure>
        <article>
          <Link to={`/artist/${userId}/artworks/${artwork.id}/edit`}>
            <button type="button">Modifier</button>
          </Link>
          <button type="button" onClick={handleOnSubmit}>
            Supprimer
          </button>
        </article>
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default ArtistArtworkDetailPage;
