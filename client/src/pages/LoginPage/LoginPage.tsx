import "./LoginPage.css";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

function LoginPage() {
  const { setIsLogged, setUser } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (data: FormData) => {
    const values = Object.fromEntries(data);

    fetch("http://localhost:3310/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Echec de connexion");
          throw new Error("Connexion failed");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Vous êtes connecté");
        setIsLogged(true);
        setUser(data);
        navigate("/");
      });
  };
  return (
    <>
      <main className="login-main">
        <img src="/image16.webp" alt="Artwork" />
        <section>
          <Link to="/">
            <img src="/black_logo.png" alt="logo of CreaNova" />
          </Link>
          <h1>Connexion</h1>
          <form action={handleSubmit}>
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
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
export default LoginPage;
