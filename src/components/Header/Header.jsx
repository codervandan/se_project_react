import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar-img.svg";
import "./Header.css";
import "../Main/Main.css";
import "../App/App.css";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleOpenAddGarmentModal, weatherData }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", { month: "long", day: "numeric" });
  return (
    <header className="header">
      <div className="header__side">
        <Link to="/" className="header__logo_link">
          <img className="header__logo" src={logo} alt="WTWR Logo" />
        </Link>
        <p className="header__place">
          <time className="header__datetime" dateTime={now}>
            {dateStr}
          </time>
          , {weatherData.city}
        </p>
      </div>
      <div className="header__side">
        <ToggleSwitch />
        <button onClick={handleOpenAddGarmentModal} className="header__add-clothes-btn">
          + Add Clothes
        </button>
        <Link className="header__link" to="/profile">
          <p className="header__username">Daniel Quintana</p>
          <img className="header__avatar" src={avatar} alt="Daniel Quintana" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
