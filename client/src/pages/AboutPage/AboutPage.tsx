import { Link } from "react-router";
import "./AboutPage.css";

function AboutPage() {
  return (
    <main className="about-page">
      <section className="text">
        <h1>Notre histoire</h1>
        <p>
          Le site, baptisé 'CreaNova', devient rapidement un havre pour les
          artistes du monde entier. Les peintres, dessinateurs, photographes
          trouvent en CreaNova un espace où ils peuvent non seulement vendre
          leurs œuvres, mais aussi raconter leur histoire et entrer en contact
          avec une communauté d'amateurs d'art.{" "}
        </p>
        <p>
          Grâce à CreaNova, de nombreux artistes peuvent vivre de leur passion
          et atteindre un public mondial. Des talents cachés sont découverts,
          des carrières sont lancées et des communautés artistiques se forment.
          L'équipe de développeurs, fière de sa création, continue d'innover et
          d'améliorer la plateforme, toujours à l'écoute des besoins et des
          retours des artistes.
        </p>
        <p>
          CreaNova est bien plus qu'un simple site de vente d'œuvres d'art.
          C'est un lieu où l'art et la technologie se rencontrent pour créer
          quelque chose de vraiment spécial. Et tout cela est rendu possible
          grâce à la passion, au dévouement et au talent d'une équipe de
          développeurs qui osent rêver grand.
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
                className="github-link"
                src="image/github-logo.webp"
                alt="logo-Github"
              />
            </Link>
            <Link to="https://www.linkedin.com/in/anne-durand44/">
              <img
                className="linkedin-link"
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
                className="github-link"
                src="image/github-logo.webp"
                alt="logo-Github"
              />
            </Link>
            <Link to="https://www.linkedin.com/in/ahmed-firoum/">
              <img
                className="linkedin-link"
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
                className="github-link"
                src="image/github-logo.webp"
                alt="logo-Github"
              />
            </Link>
            <Link to="https://www.linkedin.com/in/mohamed-aouis-968300338/">
              <img
                className="linkedin-link"
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
                className="github-link"
                src="image/github-logo.webp"
                alt="logo-Github"
              />
            </Link>
            <Link to="https://www.linkedin.com/in/tristan-zubiarrain/">
              <img
                className="linkedin-link"
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
