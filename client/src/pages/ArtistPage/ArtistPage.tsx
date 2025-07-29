import { useEffect, useState } from "react";
import "./ArtistPage.css";
import { Link } from "react-router";

function ArtistPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/artist")
      .then((res) => res.json())
      .then((data) => setArtists(data));
  }, []);
  return (
    <main className="artist-page-main">
      <h1>Artistes</h1>
      {artists.map((artist) => (
        <figure key={artist.id}>
          <Link to={`/artist/${artist.id}`}>
            <img
              src={`http://localhost:3310/${artist.image}`}
              alt={`${artist.firstname} ${artist.lastname}`}
            />
            <figcaption>
              {artist.firstname} {artist.lastname}
            </figcaption>
          </Link>
        </figure>
      ))}
    </main>
  );
}

export default ArtistPage;
