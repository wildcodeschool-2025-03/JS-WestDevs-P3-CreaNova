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
      <h1 className="title"> Gallerie</h1>
      <div id="search_bar">
        <button className="search" type="button">
          Rechercher une oeuvre...
        </button>
      </div>

      {artwork.map((artwork) => (
        <figure key={artwork.id}>
          <img className="favorite" src="img/favorite.png" alt="favorite" />
          <img src={artwork.image} alt={artwork.title} />

          <figcaption>
            {artwork.firstname} {artwork.lastname}
            <img src="img/shopping-cart-white-icon.png" alt="panier" />
          </figcaption>
        </figure>
      ))}
    </main>
  );
}

export default GalleryPage;
