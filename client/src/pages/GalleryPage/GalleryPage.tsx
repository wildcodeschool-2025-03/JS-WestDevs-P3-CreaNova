import { useEffect, useState } from "react";
import "./GalleryPage.css";

function GalleryPage() {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/artwork/artwork-category")
      .then((res) => res.json())
      .then((data) => setArtwork(data));
  }, []);
  console.log(artwork);
  return (
    <main className="gallery_page">
      <h1> Gallerie</h1>
      {artwork.map((artwork) => (
        <figure key={artwork.id}>
          <img src={artwork.image} alt={artwork.title} />
          <figcaption>
            {artwork.firstname} {artwork.lastname}
          </figcaption>
        </figure>
      ))}
    </main>
  );
}

export default GalleryPage;
