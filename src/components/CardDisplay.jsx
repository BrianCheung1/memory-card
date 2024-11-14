import { useState, useEffect } from "react";
import Card from "./Card";
import "../css/CardDisplay.css";

const CardDisplay = () => {
    const [allPokemons, setAllPokemons] = useState([]); // Store all Pokémon data
    const [randomPokemons, setRandomPokemons] = useState([]); // Store selected random Pokémon
    const [counter, setCounter] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [selectedPokemons, setSelectedPokemons] = useState([]);

    const selectRandomPokemons = () => {
        // Shuffle a copy of the Pokémon list and pick the first 6
        const shuffled = [...allPokemons].sort(() => 0.5 - Math.random()).slice(0, 6);
        setRandomPokemons(shuffled); // Update state with the selected Pokémon
    };

    const handleCardClick = (pokemon) => {
        console.log(`You clicked on ${pokemon.id}`);
        if (selectedPokemons.includes(pokemon.id)) {
            setBestScore(Math.max(bestScore, counter)); // Update best score if new score is higher
            setCounter(0); // Reset counter
            setSelectedPokemons([]); // Reset selected Pokémon array
        } else {
            setCounter((prevCounter) => prevCounter + 1); // Increment counter
            setSelectedPokemons((prevSelectedPokemons) => [
                ...prevSelectedPokemons,
                pokemon.id,
            ]);
        }
        selectRandomPokemons(); // Refresh the displayed Pokémon
    };

    useEffect(() => {
        // Fetch Pokémon list once on component mount
        fetch("https://pokeapi.co/api/v2/pokemon?limit=200&offset=0")
            .then((response) => response.json())
            .then((data) => {
                // Fetch detailed data for all Pokémon
                return Promise.all(
                    data.results.map((pokemon) =>
                        fetch(pokemon.url).then((response) => response.json())
                    )
                );
            })
            .then((details) => {
                setAllPokemons(details); // Store detailed Pokémon data
                setRandomPokemons(details.sort(() => 0.5 - Math.random()).slice(0, 6)); // Initialize random Pokémon
            })
            .catch((error) => console.error("Error fetching Pokémon data:", error));
    }, []);

    return (
        <div className="card-display">
            <h1>Counter: {counter}</h1>
            <h1>Best Score: {bestScore}</h1>
            <div className="card-container">
                {randomPokemons.map((pokemon, index) => (
                    <Card
                        key={index}
                        pokemon={pokemon}
                        onClick={() => handleCardClick(pokemon)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardDisplay;
