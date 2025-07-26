import { useEffect, useState } from "react";

function ArtworksSection() {
  const [artworks, setArtworks] = useState();

  useEffect(() => {
    fetch("http://localhost:3310/api/admin/artworks", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
      });
  });
  if (!artworks) {
    return <h1>prob</h1>;
  }
  return (
    <section>
      <h1>test</h1>
    </section>
  );
}
export default ArtworksSection;
