import avatar from "../../assets/avatar-img.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        <p className="sidebar__username">Daniel Quintana</p>
        <img className="sidebar__avatar" src={avatar} alt="Daniel Quintana" />
      </div>
    </aside>
  );
}

export default SideBar;
