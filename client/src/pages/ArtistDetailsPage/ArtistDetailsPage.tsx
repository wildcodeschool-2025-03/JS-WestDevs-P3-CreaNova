import { useParams } from "react-router";
import "./ArtistDetailsPage.css";
import { useEffect, useState } from "react";
interface ArtistArtworks {
  id: number;
  firstname: string;
  lastname: string;
  city: string;
  country: string;
  artist_image: string;
  artwork_image: string;
  artist_description: string;
  artwork_description: string;
  title: string;
  price: number;
}
function ArtistDetailsPage() {
  const { id } = useParams();
  const [artistData, setArtistData] = useState<ArtistArtworks[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/artist/${id}`)
      .then((res) => res.json())
      .then((data) => setArtistData(data));
  }, [id]);
  const artist = artistData[0];
  const artworks = artistData.map((item) => ({
    image: item.artwork_image,
    title: item.title,
    description: item.artwork_description,
    price: item.price,
    id: item.id,
  }));

  if (!artist || !artworks) {
    return <h1>Il n'y a pas d'artiste</h1>;
  }

  return (
    <main className="artist-detail-page">
      <section className="artist-section">
        <article>
          <h1>
            {artist.firstname} {artist.lastname}
          </h1>
          <p>{artist.artist_description}</p>
        </article>
        <div className="image-artist">
          <img
            src={artist.artist_image}
            alt={`${artist.firstname} ${artist.lastname}`}
          />
        </div>
      </section>
      <section className="artist-artwork-section">
        <h2>Oeuvres</h2>
        {artworks.map((artwork) => (
          <div key={artwork.id}>
            <img src={artwork.image} alt={artwork.title} />
          </div>
        ))}
      </section>
    </main>
  );
}

export default ArtistDetailsPage;
