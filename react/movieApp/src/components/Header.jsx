import reactflix from "../assets/logo.2dd7d506.png";
import "./Header.css";
import Button from "../components/Button";

export default function Header({ homeButtonClick, aboutButtonClick }) {
  return (
    <div className="header_container">
      <img className="reactflix" src={reactflix} alt="reactflixPicture" />
      <Button className="home-button" onClick={homeButtonClick}>
        Home
      </Button>
      <Button className="about-button" onClick={aboutButtonClick}>
        About
      </Button>
    </div>
  );
}
