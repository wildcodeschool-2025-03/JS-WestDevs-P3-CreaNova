import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import "./EditArtworkPage.css";

function EditArtworkPage() {
  const [artwork, setArtwork] = useState<Artwork>();
  const { isLogged } = useAuth();
  const { userId, artworkId } = useParams();
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [file, setFile] = useState<File | undefined>();
  const [previewImage, setPreviewImage] = useState<string>();

  useEffect(() => {
    fetch(`http://localhost:3310/api/artist/${userId}/artworks/${artworkId}`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data[0]);
      });
  }, [userId, artworkId]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 500 * 1024) {
        toast.error("La taille de l'image ne doit pas être supérieur à 500ko");
        e.target.value = "";
        setFile(undefined);
        setPreviewImage(undefined);
        return;
      }
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const target = e.currentTarget as HTMLFormElement;
    formData.append(
      "title",
      (target.elements.namedItem("title") as HTMLInputElement).value,
    );
    formData.append(
      "description",
      (target.elements.namedItem("description") as HTMLTextAreaElement).value,
    );
    formData.append(
      "price",
      (target.elements.namedItem("price") as HTMLInputElement).value,
    );
    if (file) {
      formData.append("image", file);
    }
    fetch(`http://localhost:3310/api/artwork/${artworkId}`, {
      credentials: "include",
      method: "put",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Oeuvre modifiée !");
        timeoutRef.current = setTimeout(() => {
          navigate(`/collection/${userId}`);
        }, 2000);

        fetch(
          `http://localhost:3310/api/artist/${userId}/artworks/${artworkId}`,
          {
            credentials: "include",
          },
        )
          .then((res) => res.json())
          .then((data) => {
            setArtwork(data[0]);
          });
      });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!artwork) {
    return (
      <main className="place-items">
        <Link to="/">
          <h1>Vous n'avez pas d'oeuvre qui possède cet identifiant.</h1>
        </Link>
      </main>
    );
  }
  if (!isLogged) {
    return (
      <main className="link-login">
        <section>
          <p>Vous devez être connecté pour accéder à cette page.</p>
          <Link to="/login">
            <button type="button">Accéder à la page de connexion</button>
          </Link>
        </section>
      </main>
    );
  }
  return (
    <>
      <main className="edit-artwork-page">
        <section>
          <h1>Modifier l'oeuvre</h1>
          <form className="form" onSubmit={handleOnSubmit}>
            <label htmlFor="title"> Titre de l'oeuvre </label>
            <input type="text" name="title" defaultValue={artwork.title} />
            <label htmlFor="description"> Description de l'oeuvre</label>
            <textarea
              id="description"
              name="description"
              defaultValue={artwork.description}
            />
            <label htmlFor="price"> Tarif:</label>
            <input type="text" name="price" defaultValue={artwork.price} />
            <input
              type="file"
              name="image"
              id="artwork-image"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFile}
            />
            <label htmlFor="artwork-image" className="file-label">
              Choisir une image
            </label>
            {file ? (
              <section>
                <p>Nom : {file.name}</p>
                <p>Taille : {file.size} bytes</p>
                <img src={previewImage} alt="Prévisualisation" />
              </section>
            ) : (
              artwork?.image && (
                <section>
                  <p>Image actuelle :</p>
                  <img
                    src={`http://localhost:3310/${artwork.image}`}
                    alt="Prévisualition fichier actuel"
                  />
                </section>
              )
            )}
            <button type="submit">Modifier</button>
          </form>
        </section>
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default EditArtworkPage;
