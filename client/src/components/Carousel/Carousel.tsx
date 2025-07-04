import { useEffect, useRef, useState } from "react";
import "./Carousel.css";

function Carousel({ title, category }: CarouselProps) {
  const carouselRef = useRef<HTMLUListElement | null>(null);
  const [carousel, setCarousel] = useState<Carousel[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/carousel/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setCarousel(data);
      });
  }, [category]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <section className="carousel-container">
      <h2>{title}</h2>
      <div className="carousel-controls">
        <button type="button" className="arrow left" onClick={scrollLeft}>
          <img src="fleche-gauche.png" alt="Fleche gauche" />
        </button>

        <ul className="carousel" ref={carouselRef}>
          {carousel.map((el) => (
            <li key={el.id}>
              <img src={el.image} alt={el.sub_category_name} />
              <figcaption>{el.sub_category_name}</figcaption>
            </li>
          ))}
        </ul>

        <button type="button" className="arrow right" onClick={scrollRight}>
          <img src="fleche-droite.png" alt="Fleche droite" />
        </button>
      </div>
    </section>
  );
}

export default Carousel;
