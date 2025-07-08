import { useContext, useEffect, useState } from "react";
import "./UserFormPage.css";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

function UserFormPage() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // Vérifier que le contexte existe
  if (!authContext) {
    return <div>Erreur: Contexte d'authentification non trouvé</div>;
  }

  const { user, isLogged } = authContext;

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  useEffect(() => {
    if (!isLogged && user === null) {
      navigate("/login"); // Ajuste le chemin selon ton routage
    }
  }, [isLogged, user, navigate]);

  // Si pas d'utilisateur, afficher un loader pendant la vérification
  if (!user && isLogged === false) {
    return <div>Chargement des données utilisateur...</div>;
  }

  // Vérification supplémentaire pour TypeScript
  if (!user) {
    return <div>Chargement des données utilisateur...</div>;
  }

  const userId = user.id;

  // State pour stocker les données utilisateur récupérées
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    street: "",
    city: "",
    zip_code: "",
    country: "",
    image: "",
    description: "",
  });

  // Charger les données utilisateur au montage
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3310/api/user/${userId}`, {
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erreur lors de la récupération");
          return res.json();
        })
        .then((data) => {
          setFormData({
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            email: data.email || "",
            street: data.street || "",
            city: data.city || "",
            zip_code: data.zip_code || "",
            country: data.country || "",
            image: data.image || "",
            description: data.description || "",
          });
        })
        .catch(() => {
          toast.error("Impossible de récupérer les données utilisateur");
        });
    }
  }, [userId]);

  // Gestion des changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3310/api/user/${userId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      toast.success("Profil mis à jour avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  return (
    <main className="user-form-main">
      <section>
        <img src="/img/contact.png" alt="contact" />
        <figcaption>{`${formData.firstname} ${formData.lastname}`}</figcaption>

        <form onSubmit={handleSubmit}>
          <h2>Mes informations personnelles</h2>

          <label htmlFor="lastname">Nom</label>
          <input
            type="text"
            placeholder="ex: Dupont"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />

          <label htmlFor="firstname">Prénom</label>
          <input
            name="firstname"
            type="text"
            placeholder="ex: Jean"
            value={formData.firstname}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="ex: jean.dupont@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <h2>Mon Adresse</h2>

          <label htmlFor="street">Adresse</label>
          <input
            type="text"
            placeholder="ex: 123 rue de Paris"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />

          <label htmlFor="city">Ville</label>
          <input
            type="text"
            placeholder="ex: Paris"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          <label htmlFor="zip_code">Code Postal</label>
          <input
            type="text"
            placeholder="ex: 75000"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
          />

          <label htmlFor="country">Pays</label>
          <input
            type="text"
            placeholder="ex: France"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="ex: Passionné d'art contemporain..."
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <button type="submit">Valider</button>
        </form>
      </section>
    </main>
  );
}

export default UserFormPage;
