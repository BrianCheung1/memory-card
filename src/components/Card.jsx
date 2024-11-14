
import "../css/Card.css"
const Card = ({ pokemon, onClick }) => {
    return (
        <div onClick={onClick} className="card">
            <img src={pokemon.sprites.other.home.front_default} />
        </div>
    )
}

export default Card
