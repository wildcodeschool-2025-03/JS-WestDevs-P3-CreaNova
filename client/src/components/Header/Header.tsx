import { slide as Menu } from "react-burger-menu";
import "./Header.css";
import { useState } from "react";
import { Link } from "react-router";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header>
        <section className="menu-et-logo">
          <Menu
            isOpen={isOpen}
            onOpen={() => setIsOpen(!isOpen)}
            onClose={() => setIsOpen(!isOpen)}
          >
            <Link
              id="artistes"
              className="menu-item"
              to="/artistes"
              onClick={() => setIsOpen(false)}
            >
              Artistes
            </Link>

            <Link
              id="peintures"
              className="menu-item"
              to="/peintures"
              onClick={() => setIsOpen(false)}
            >
              Peintures
            </Link>

            <Link
              id="photographies"
              className="menu-item"
              to="/photographies"
              onClick={() => setIsOpen(false)}
            >
              Photographies
            </Link>

            <Link
              id="dessins"
              className="menu-item"
              to="/dessins"
              onClick={() => setIsOpen(false)}
            >
              Dessins
            </Link>

            <Link
              id="newsletter"
              className="menu-item"
              to="/newsletter"
              onClick={() => setIsOpen(false)}
            >
              Newsletters
            </Link>

            <Link
              id="a propos"
              className="menu-item"
              to="/a propos"
              onClick={() => setIsOpen(false)}
            >
              A propos
            </Link>
          </Menu>

          <img className="logo" src="./img/black_logo.png" alt="logo-black" />
        </section>
        <nav className="nav_menu">
          <Link to="/dark_mode">
            <img src="./img/soleil.png" alt="dark_mode" />
          </Link>
          <Link to="/favoris">
            <img src="./img/amour-du-coeur.png" alt="coeur" />
          </Link>
          <Link to="/panier">
            <img src="./img/panier.png" alt="panier" />
          </Link>
          <Link to="/contact">
            <img src="./img/contact.png" alt="contact" />
          </Link>
        </nav>
      </header>
      <hr />
    </>
  );
};

export default Header;
