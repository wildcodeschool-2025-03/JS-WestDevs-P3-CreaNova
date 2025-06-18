import { useState } from "react";
import "./Header.css";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header>
        <section className="droite">
          <Menu
            isOpen={isOpen}
            onOpen={() => setIsOpen(!isOpen)}
            onClose={() => setIsOpen(!isOpen)}
          >
            <Link
              id="home"
              className="menu-item"
              to="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </Menu>
          <img src="./img/black_logo.png" alt="logo-black" />
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
