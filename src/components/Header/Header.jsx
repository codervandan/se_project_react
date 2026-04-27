import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar-img.svg';
import './Header.css';
import '../Main/Main.css';
import '../App/App.css';

function Header({ ModalWithForm }) {
	const now = new Date();
	const dateStr = now.toLocaleDateString('default', { month: 'long', day: 'numeric' });
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="WTWR Logo" />
			<p className="header__place">
				<time className="header__datetime" dateTime={now}>{dateStr}</time>
				, Stayton
			</p>
			<button className="header__add-clothes-btn" onClick={ModalWithForm}>+ Add Clothes</button>
			<p className="header__username">Daniel Quintana</p>
			<img className="header__avatar" src={avatar} alt="Daniel Quintana" />
    </header>
  );
}

export default Header;