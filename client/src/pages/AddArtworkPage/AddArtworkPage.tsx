import { Link, useParams } from "react-router";
import "./AddArtworkPage.css";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

function AddArtworkPage() {
  const { userId } = useParams();
  const { isLogged } = useAuth();
  const [file, setFile] = useState<File | undefined>();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 500 * 1024) {
        toast.error("La taille de l'image ne doit pas être supérieur à 500ko");
        e.target.value = "";
        setFile(undefined);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append("user_account_id", String(userId));
    const tags = [data.get("tag1"), data.get("tag2"), data.get("tag3")]
      .filter((tag) => typeof tag === "string" && tag.trim() !== "")
      .join(",");
    data.append("tags", tags);

    fetch("http://localhost:3310/api/artworks", {
      method: "POST",
      credentials: "include",
      body: data,
    }).then((res) => {
      if (res.ok) {
        toast.success("Oeuvre ajoutée avec succès !");
      } else {
        throw new Error("Erreur lors de l'ajout");
      }
    });
  };
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
      <main className="add-artwork-page">
        <section>
          <h1>Ajouter une oeuvre</h1>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="title"> Titre de l'oeuvre </label>
            <input type="text" name="title" />

            <label htmlFor="description"> Description de l'oeuvre</label>
            <input id="description" type="text" name="description" />

            <input
              type="file"
              name="image"
              id="artwork-image"
              accept="image/png, image/jpg, image/jpeg"
              onChange={handleFile}
            />
            <label htmlFor="artwork-image" className="file-label">
              Choisir une image
            </label>

            {file && (
              <section>
                <p>Nom : {file.name}</p>
                <p>Taille : {file.size} bytes</p>
              </section>
            )}

            <label htmlFor="price"> Tarif:</label>
            <input type="text" name="price" />

            <label htmlFor="mainCategory"> Catégorie principale</label>
            <select name="mainCategory" id="mainCategory">
              <option value="">Sélectionner une catégorie</option>
              <option value="peinture">Peinture</option>
              <option value="Dessin">Dessin</option>
              <option value="photographie">Photographie</option>
            </select>
            <div>
              <label htmlFor="tag1"> Tag 1</label>
              <input type="text" name="tag1" id="tag1" />
              <label htmlFor="tag2"> Tag 2</label>
              <input type="text" name="tag2" id="tag2" />
              <label htmlFor="tag3"> Tag 3</label>
              <input type="text" name="tag3" id="tag3" />
            </div>

            <button type="submit">Ajouter</button>
          </form>
        </section>
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default AddArtworkPage;
