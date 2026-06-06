import "./ItemCard.css";
import heartInactive from "../../assets/heart-inactive.svg";
import heartActive from "../../assets/heart-active.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ data, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = data.likes?.some((id) => id === currentUser._id);

  function handleLike(e) {
    e.stopPropagation();

    onCardLike({
      id: data._id,
      isLiked,
    });
  }

  function handleOpenCard() {
    onCardClick(data);
  }

  return (
    <li className="card" onClick={handleOpenCard}>
      <div className="card__header">
        <h2 className="card__title">{data.name}</h2>

        <button type="button" className="card__like-button" onClick={handleLike}>
          <img src={isLiked ? heartActive : heartInactive} alt="Like button" className="card__like-icon" />
        </button>
      </div>

      <img className="card__image" src={data.imageUrl} alt={data.name} />
    </li>
  );
}

export default ItemCard;
