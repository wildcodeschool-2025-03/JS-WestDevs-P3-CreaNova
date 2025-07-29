import { Link, useParams } from "react-router";
import "./AddArtworkPage.css";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

function AddArtworkPage() {
  const { userId } = useParams();
  const { isLogged } = useAuth();
  const handleSubmit = (data: FormData) => {
    const values = Object.fromEntries(data);
    const formData = {
      ...values,
      user_account_id: Number(userId),
      price: Number(values.price),
    };
    fetch("http://localhost:3310/api/artworks", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    toast.success("Oeuvre ajoutée avec succès !");
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
          <form className="form" action={handleSubmit}>
            <label htmlFor="title"> Titre de l'oeuvre </label>
            <input type="text" name="title" />

            <label htmlFor="description"> Description de l'oeuvre</label>
            <input id="description" type="text" name="description" />

            <label htmlFor="image"> Image URL </label>
            <input type="text" name="image" />

            <label htmlFor="price"> Tarif:</label>
            <input type="text" name="price" />
            <button type="submit">Ajouter</button>
          </form>
        </section>
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default AddArtworkPage;
