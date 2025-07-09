import { Link } from "react-router";
import "./RegistrationPage.css";
import { ToastContainer, toast } from "react-toastify";

function RegistrationPage() {
  const handleSubmit = (data: FormData) => {
    const values = Object.fromEntries(data);
    if (values.password !== values.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }
    const formData = {
      ...values,
      is_artist: values.is_artist === "on",
      confidentiality: values.confidentiality === "on",
    };
    fetch("http://localhost:3310/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    toast.success("Votre compte a bien été crée");
  };

  return (
    <>
      <main className="registration-main">
        <img src="/image16.webp" alt="Artwork" />
        <section>
          <Link to="/">
            <img src="/black_logo.png" alt="logo of CreaNova" />
          </Link>
          <h1>Créer mon compte</h1>
          <form action={handleSubmit}>
            <label htmlFor="firstname">Prénom</label>
            <input name="firstname" type="text" placeholder="ex: Jean" />
            <label htmlFor="lastname">Nom</label>
            <input type="text" placeholder="ex: Dupont" name="lastname" />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="ex: jeanDupont@gmail.com"
              name="email"
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="Votre mot de passe"
            />
            <label htmlFor="confirmPassword">
              Confirmez votre mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirmez votre mot de passe"
            />

            <div>
              <label htmlFor="is_artist">
                Veuillez cocher si vous êtes un artiste
              </label>
              <input type="checkbox" id="is_artist" name="is_artist" />
            </div>
            <div>
              <label htmlFor="confidentiality">
                accepter la politique de confidentialité
              </label>
              <input
                id="confidentiality"
                name="confidentiality"
                type="checkbox"
              />
            </div>
            <button type="submit">Créer un compte</button>
          </form>
        </section>
      </main>
      <ToastContainer position="top-right" />
    </>
  );
}
export default RegistrationPage;
