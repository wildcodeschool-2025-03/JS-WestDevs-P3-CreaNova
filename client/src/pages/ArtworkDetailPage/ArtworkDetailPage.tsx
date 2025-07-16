import { useEffect, useState } from "react";
import { useParams } from "react-router";

function ArtworkDetailPage() {
  const { id } = useParams();

  const [artwork, setArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3310/api/artwork/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data[0]);
      })
      .catch((error) => {
        console.error("Erreur pendant fetch :", error);
      });
  }, [id]);

  if (!artwork) {
    return <p>Chargement...</p>;
  }

  return (
    <main>
      <h1>{artwork.title}</h1>
      <img src={artwork.image} alt={artwork.title} />
      <p>Prix: {artwork.price}€</p>
      <p>Description: {artwork.description}</p>
      <p>Artiste: {artwork.artist_name}</p>
    </main>
  );
}

export default ArtworkDetailPage;
