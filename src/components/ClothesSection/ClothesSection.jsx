import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, handleOpenItemModal, handleOpenAddGarmentModal, onCardLike }) {
  return (
    <section className="clothes-section__block">
      <div className="clothes-section__row">
        Your Items
        <button className="clothes-section__btn" onClick={handleOpenAddGarmentModal}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__card-list">
        {clothingItems.map((item) => {
          return <ItemCard key={item._id} data={item} onCardClick={handleOpenItemModal} onCardLike={onCardLike} />;
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
