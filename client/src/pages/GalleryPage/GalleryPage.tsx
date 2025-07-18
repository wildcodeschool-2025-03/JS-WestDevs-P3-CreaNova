import { useEffect, useState } from "react";
import "./GalleryPage.css";
import { Link, useParams } from "react-router";

function GalleryPage() {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { categoryName } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3310/api/artwork/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data);
      });
  }, [categoryName]);

  const filteredArtwork = artwork.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.artist_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="gallery-page">
      <h1 className="title">{categoryName}</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher une oeuvre ou un artiste..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search"
        />
      </div>

      {filteredArtwork.map((artwork) => (
        <Link to={`/artwork/${artwork.id}`} key={artwork.id}>
          <figure>
            <img className="favorite" src="/img/favorite.png" alt="favorite" />
            <img src={artwork.image} alt={artwork.title} />

            <figcaption>
              <div className="artwork-details">
                <span>{artwork.title}</span>
                <p>de {artwork.artist_name}</p>
              </div>
              <span className="price">{artwork.price}€</span>
              <button
                className="add-to-cart"
                type="button"
                aria-label="Ajouter au panier"
              >
                <img src="/img/shopping-cart-white-icon.png" alt="" />
              </button>
            </figcaption>
          </figure>
        </Link>
      ))}
    </main>
  );
}

export default GalleryPage;
