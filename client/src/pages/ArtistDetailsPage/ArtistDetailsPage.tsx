import { useParams } from "react-router";
import "./ArtistDetailsPage.css";
import { useEffect, useState } from "react";
// interface ArtistArtworks {
//   firstname: string;
// }
function ArtistDetailsPage() {
  const { id } = useParams();
  const [artistData, setArtistData] = useState();

  useEffect(() => {
    fetch(`http://localhost:3310/api/artist/${id}`)
      .then((res) => res.json())
      .then((data) => setArtistData(data));
  }, [id]);
  if (!artistData) {
    return null;
  }
  //   const artist = artistData[0];
  return;
  //   <main>{artistData && <h1>{artistData.firstname}</h1>}</main>;
}

export default ArtistDetailsPage;
