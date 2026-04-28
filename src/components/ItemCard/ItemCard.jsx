import './ItemCard.css';


function ItemCard({ data, onCardClick }) {
    
    function handleOpenCard() {
        onCardClick(data);
    }

    return(
        <li className="card" onClick={handleOpenCard}>
            <h2 className="card__title">{data.name}</h2>
            <img className="card__image" src={data.link} alt={data.name} onClick={onCardClick}/>
        </li>
    );
}

export default ItemCard;