import { Link } from "react-router";
import "./LoginPage.css";

function LoginPage() {
  return (
    <main className="login-main">
      <img src="/image16.webp" alt="Artwork" />
      <section>
        <img src="/black_logo.png" alt="logo of CreaNova" />
        <h1>Connexion</h1>
        <form action="">
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
          <button type="submit">Se connecter</button>
          <Link to="/registration">Inscription</Link>
        </form>
      </section>
    </main>
  );
}
export default LoginPage;
