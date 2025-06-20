import { useEffect, useState } from "react";
import "./ArtistPage.css";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  image: string;
}

function ArtistPage() {
  const [artist, setArtist] = useState<User[]>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/user")
      .then((res) => res.json())
      .then((data) => setArtist(data));
  }, []);
  return (
    <main className="artist-page-main">
      <h1>Artistes</h1>
      {artist.map((test) => (
        <figure key={test.id}>
          <img
            src={`${test.image}`}
            alt={`${test.firstname} ${test.lastname}`}
          />
          <figcaption>
            {test.firstname} {test.lastname}
          </figcaption>
        </figure>
      ))}
    </main>
  );
}

export default ArtistPage;
