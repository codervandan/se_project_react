import avatar from "../../assets/avatar-img.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        <p className="sidebar__username">{currentUser?.name || ""}</p>
        <img className="sidebar__avatar" src={currentUser?.avatar || avatar} alt={currentUser?.name || "Avatar"} />
      </div>
      <button onClick={handleSignOut} className="sidebar__signout-btn">
        Sign Out
      </button>
    </aside>
  );
}

export default SideBar;
