import { useState } from "react";
import "./Header.css";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header>
        <img src="client/public/img/black_logo.png" alt="logo-black" />

        <h1>Page Header</h1>
      </header>

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
    </>
  );
};

export default Header;
