import { useEffect, useState } from "react";
import "./GalleryPage.css";
import { Link, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

function GalleryPage() {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { categoryName } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:3310/api/artwork/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data);
      });
  }, [categoryName]);

  const { search } = location;

  useEffect(() => {
    const params = new URLSearchParams(search);
    const query = params.get("search");
    if (query) {
      setSearchTerm(query);
    }
  }, [search]);

  const filteredArtwork = artwork.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.artist_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.tags.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddToFavorites = (artworkId: number) => {
    const userId = user?.id;
    fetch("http://localhost:3310/api/favorite", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, artworkId }),
    }).then((res) => {
      if (res.ok) {
        toast.success("Oeuvre ajoutée au favori ");
      }
    });
  };

  return (
    <>
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
          <figure key={artwork.id}>
            <button
              type="button"
              onClick={() => handleAddToFavorites(artwork.id)}
              className="favorite"
            >
              <label className="container">
                <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                <svg
                  id="Layer_1"
                  version="1.0"
                  viewBox="0 0 24 24"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <title>Favori</title>
                  <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z" />
                </svg>
              </label>
            </button>

            <Link to={`/artwork/${artwork.id}`}>
              <img
                src={`http://localhost:3310/${artwork.image}`}
                alt={artwork.title}
              />
            </Link>

            <figcaption>
              <div className="artwork-details">
                <span>{artwork.title}</span>
                <p>de {artwork.artist_name}</p>
                <div className="tags">{artwork.tags}</div>
              </div>
              <span className="price">{artwork.price}€</span>
              {artwork.sold ? (
                <span className="is-sold">Vendu</span>
              ) : (
                <button
                  className="add-to-cart"
                  type="button"
                  aria-label="Ajouter au panier"
                  onClick={() =>
                    addToCart({
                      id: artwork.id,
                      title: artwork.title,
                      image: artwork.image,
                      price: Number(artwork.price),
                      artist_name: artwork.artist_name,
                    })
                  }
                >
                  <img src="/img/shopping-cart-white-icon.png" alt="" />
                </button>
              )}
            </figcaption>
          </figure>
        ))}
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default GalleryPage;
