import "./Footer.css";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="banner-footer">
      <Link to="/">
        <p>à propos</p>
      </Link>
      <figure>
        <a href="https://www.instagram.com/" target="blank">
          <img src="public/image/instagram.png" alt="logo instagram" />
        </a>

        <a href="https://www.facebook.com/" target="blank">
          <img src="public/image/facebook.png" alt="logo facebook" />
        </a>

        <a href="https://www.linkedin.com/" target="blank">
          <img src="public/image/linkedin.png" alt="logo linkedin" />
        </a>

        <a href="https://x.com/" target="blank">
          <img src="public/image/twitter.png" alt="logo twitter" />
        </a>
      </figure>
    </footer>
  );
}
export default Footer;
