import { useRef } from "react";
import "./Carousel.css";

function Carousel() {
  const carouselRef = useRef<HTMLUListElement | null>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  return (
    <div className="carousel-container">
      <h2>Peintures</h2>
      <button type="button" className="arrow left" onClick={scrollLeft}>
        ⬅
      </button>

      <ul className="carousel" ref={carouselRef}>
        <li>
          <img src="claudio-schwarz.webp" alt="" />
          <figcaption>Sport</figcaption>
        </li>
        <li>
          <img src="boston-public.webp" alt="" />
          <figcaption>Sport</figcaption>
        </li>
        <li>
          <img src="240_F2.webp" alt="" />
          <figcaption>Sport</figcaption>
        </li>
        <li>
          <img src="illustrated-watercolor.webp" alt="" />
          <figcaption>Sport</figcaption>
        </li>
        <li>
          <img src="pexels-christian.webp" alt="" />
          <figcaption>Sport</figcaption>
        </li>
      </ul>

      <button type="button" className="arrow right" onClick={scrollRight}>
        ⮕
      </button>
    </div>
  );
}

export default Carousel;
