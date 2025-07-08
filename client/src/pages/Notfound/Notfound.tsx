import { useEffect, useState } from "react";
import "./NotFound.css";
import { useNavigate } from "react-router";

function NotFound() {
  const [second, setSecond] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecond((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [navigate]);
  return (
    <main className="notfound-container">
      <p>Retour à l'accueil dans {second}</p>
      <img src="/image/404.png" alt="page404" />
    </main>
  );
}
export default NotFound;
