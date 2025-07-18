import { useEffect, useState } from "react";
import "./GalleryPage.css";
import { Link, useParams } from "react-router";
import { ToastContainer } from "react-toastify";
import { useCart } from "../../hooks/useCart";

function GalleryPage() {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const { categoryName } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3310/api/artwork/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data);
      });
  }, [categoryName]);

  return (
    <>
      <main className="gallery_page">
        <h1 className="title">{categoryName}</h1>
        <div id="search_bar">
          <button className="search" type="button">
            Rechercher une oeuvre...
          </button>
        </div>

        {artwork.map((artwork) => (
          <figure key={artwork.id}>
            <img className="favorite" src="/img/favorite.png" alt="favorite" />
            <Link to={`/artwork/${artwork.id}`}>
              <img src={artwork.image} alt={artwork.title} />
            </Link>

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
            </figcaption>
          </figure>
        ))}
      </main>
      <ToastContainer />
    </>
  );
}

export default GalleryPage;
