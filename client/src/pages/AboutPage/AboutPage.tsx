import { Link } from "react-router";
import "./AboutPage.css";

function AboutPage() {
  return (
    <main className="about-page">
      <section className="text">
        <h1>Notre histoire</h1>
        <p>
          Dans un petit bureau lumineux situé au cœur d'un quartier dynamique,
          une équipe de développeurs passionnés s'est réunie autour d'un projet
          ambitieux : créer une plateforme en ligne dédiée aux artistes, un
          espace où ils pourraient exposer leurs œuvres, les vendre, se faire
          connaître et partager leur talent avec le monde entier.{" "}
        </p>
        <p>
          L'équipe, composée de quatre membres aux compétences variées, a
          travaillé sans relâche pendant des mois pour donner vie à ce rêve. Il
          y avait Anne, la chef de projet, dont la vision claire et la
          détermination sans faille ont guidé l'équipe à travers les hauts et
          les bas du développement. Ahmed, le développeur backend, a construit
          une infrastructure solide et sécurisée, capable de gérer des milliers
          de transactions et de données utilisateurs. Mohammed, le développeur
          frontend, a créé une interface utilisateur intuitive et esthétique,
          mettant en valeur les œuvres d'art de manière élégante et
          professionnelle. Tristan, le designer UX/UI, a veillé à ce que chaque
          interaction sur le site soit fluide et agréable.{" "}
        </p>
        <p>
          Le site, baptisé "CreaNova", est rapidement devenu un havre pour les
          artistes du monde entier. Les peintres, dessinateurs, photographes ont
          trouvé en CreaNova un espace où ils pouvaient non seulement vendre
          leurs œuvres, mais aussi raconter leur histoire et entrer en contact
          avec une communauté d'amateurs d'art.{" "}
        </p>
        <p>
          L'une des fonctionnalités les plus appréciées de CreaNova était la
          possibilité pour les artistes de créer des galeries virtuelles
          personnalisées. Ces galeries permettaient aux visiteurs de découvrir
          les œuvres dans un environnement immersif, presque comme s'ils
          visitaient une galerie d'art physique.{" "}
        </p>
        <p>
          Grâce à CreaNova, de nombreux artistes ont pu vivre de leur passion et
          atteindre un public mondial. Des talents cachés ont été découverts,
          des carrières ont été lancées et des communautés artistiques se sont
          formées. L'équipe de développeurs, fière de leur création, continuait
          à innover et à améliorer la plateforme, toujours à l'écoute des
          besoins et des retours des artistes.
        </p>
        <p>
          CreaNova était bien plus qu'un simple site de vente d'œuvres d'art.
          C'était un lieu où l'art et la technologie se rencontraient pour créer
          quelque chose de vraiment spécial. Et tout cela avait été rendu
          possible grâce à la passion, au dévouement et au talent d'une équipe
          de développeurs qui avaient osé rêver grand.
        </p>
        <h1>Notre équipe</h1>
        <span>
          <div className="team-member">
            <p>
              <strong>Anne DURAND,</strong>
              <br /> Chef de projet
            </p>
            <Link to="https://github.com/Anne0709">
              <img
                id="github-link"
                src="image/github-logo.webp"
                alt="logo-Github"
              />
            </Link>
            <Link to="https://www.linkedin.com/in/anne-durand44/">
              <img
                id="linkedin-link"
                src="image/linkedin.png"
                alt="logo-Linkedin"
              />
            </Link>
          </div>
          <img src="img/Anne-ID.webp" alt="Anne DURAND" />
        </span>
        <span>
          <img src="img/Ahmed-ID.webp" alt="Ahmed FIROUM" />
          <div className="team-member">
            <p>
              <strong>Ahmed FIROUM,</strong>
              <br /> Développeur Backend
            </p>
            <Link to="https://github.com/AhmedFikado">
              <img
                id="github-link"
                src="image/github-logo.webp"
                alt="logo-Github"
              />
            </Link>
            <Link to="https://www.linkedin.com/in/ahmed-firoum/">
              <img
                id="linkedin-link"
                src="image/linkedin.png"
                alt="logo-Linkedin"
              />
            </Link>
          </div>
        </span>
        <span>
          <div className="team-member">
            <p>
              <strong>Mohamed AOUIS,</strong>
              <br /> Développeur Frontend
            </p>
            <Link to="https://github.com/Mohamed-am10">
              <img
                id="github-link"
                src="image/github-logo.webp"
                alt="logo-Github"
              />
            </Link>
            <Link to="https://www.linkedin.com/in/mohamed-aouis-968300338/">
              <img
                id="linkedin-link"
                src="image/linkedin.png"
                alt="logo-Linkedin"
              />
            </Link>
          </div>
          <img src="img/MohamedA.png" alt="Mohamed AOUIS" />
        </span>
        <span>
          <img src="img/Tristan.png" alt="Tristan ZUBIARRAIN " />
          <div className="team-member">
            <p>
              <strong>Tristan ZUBIARRAIN,</strong>
              <br /> Designer UX/UI
            </p>
            <Link to="https://github.com/Tristanzubi">
              <img
                id="github-link"
                src="image/github-logo.webp"
                alt="logo-Github"
              />
            </Link>
            <Link to="https://www.linkedin.com/in/tristan-zubiarrain/">
              <img
                id="linkedin-link"
                src="image/linkedin.png"
                alt="logo-Linkedin"
              />
            </Link>
          </div>
        </span>
      </section>
    </main>
  );
}
export default AboutPage;
