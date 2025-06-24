import { useRef } from "react";
import "./Carousel.css";

interface CarouselProps {
  title: string;
  items: { id: string; src: string; caption: string }[];
}

function Carousel({ title, items }: CarouselProps) {
  const carouselRef = useRef<HTMLUListElement | null>(null);

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
          ⬅
        </button>

        <ul className="carousel" ref={carouselRef}>
          {items.map((el) => (
            <li key={el.id}>
              <img src={el.src} alt={el.caption} />
              <figcaption>{el.caption}</figcaption>
            </li>
          ))}
        </ul>

        <button type="button" className="arrow right" onClick={scrollRight}>
          ⮕
        </button>
      </div>
    </section>
  );
}

export default Carousel;
