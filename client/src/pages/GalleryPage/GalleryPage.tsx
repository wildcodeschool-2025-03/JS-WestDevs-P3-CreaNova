import { useEffect, useState } from "react";
import "./GalleryPage.css";
import { useParams } from "react-router";

function GalleryPage() {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const { categoryName } = useParams();
  console.log("Catégorie :", categoryName);

  useEffect(() => {
    fetch(`http://localhost:3310/api/artwork/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => setArtwork(data));
  }, [categoryName]);

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
