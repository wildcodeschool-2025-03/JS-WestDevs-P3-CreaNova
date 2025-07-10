import { useNavigate, useParams } from "react-router";
import "./ArtistArtworkDetailPage.css";
import { useEffect, useState } from "react";

function ArtistArtworkDetailPage() {
  const [artwork, setArtwork] = useState<Artwork>();
  const { userId, artworkId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3310/api/artist/${userId}/artworks/${artworkId}`)
      .then((res) => res.json())
      .then((data) => setArtwork(data[0]));
  }, [userId, artworkId]);

  const handleOnSubmit = () => {
    fetch(`http://localhost:3310/api/artworks/${artworkId}`, {
      method: "delete",
    }).then((res) => {
      if (res.status === 200) {
        navigate("/");
      }
    });
  };
  if (!artwork) {
    return <h1>Vous n'avez pas d'oeuvre disponible ici.</h1>;
  }
  return (
    <main className="artist-artwork-detail-main">
      <h1>{artwork.title}</h1>
      <figure>
        <img src={artwork.image} alt={artwork.title} />
        <figcaption>{artwork.title}</figcaption>
      </figure>
      <article>
        <button type="button">Modifier</button>
        <button type="button" onClick={handleOnSubmit}>
          Supprimer
        </button>
      </article>
    </main>
  );
}

export default ArtistArtworkDetailPage;
