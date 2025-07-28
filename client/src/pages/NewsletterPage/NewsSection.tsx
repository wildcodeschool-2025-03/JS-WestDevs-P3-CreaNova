import { useEffect, useState } from "react";

function NewsSection() {
  const [news, setNews] = useState<New[]>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
      });
  }, []);
  if (!news || news.length === 0) {
    return <h1>problem</h1>;
  }
  return (
    <section className="news-section-newsletter">
      {news.map((newItem) => (
        <section key={newItem.id}>
          <article>
            <h3>{newItem.title}</h3>
            <p>{newItem.text}</p>
          </article>
          <img src={newItem.image} alt="Illustration de l'actualité" />
        </section>
      ))}
    </section>
  );
}
export default NewsSection;
