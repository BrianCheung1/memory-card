import "../css/Card.css"

const Card = ({ pokemon, onClick }) => {
  // Handle cases where the sprite might not be available
  const imageSrc =
     pokemon?.sprite

  return (
    <div onClick={onClick} className="card">
      {/* Display Pokémon name */}
      <h3>{pokemon?.name || "Unknown Pokémon"}</h3>
      {/* Show the image or a fallback if unavailable */}
      <img src={imageSrc} alt={pokemon?.name || "Unknown Pokémon"} />
    </div>
  )
}

export default Card
