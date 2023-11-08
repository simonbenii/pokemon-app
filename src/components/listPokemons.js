import { useEffect, useState } from "react";

function ListPokemons({ url, select, selected }) {
  const [pokemons, setPokemons] = useState([]);
  //console.log(pokemons);
  useEffect(() => {
    const getPokemons = async () => {
      const rawLocation = await fetch(url);
      const location = await rawLocation.json();
      if (location.areas.length > 0) {
        const areaURL = location.areas[0].url;

        const rawPokemons = await fetch(areaURL);
        const pokemons = await rawPokemons.json();
        loadPokemons(pokemons.pokemon_encounters);
      } else {
        setPokemons("not found");
      }
    };

    const loadPokemons = async (pokemonObject) => {
      setPokemons([]); // reset hook
      await pokemonObject.map(async (poke) => {
        const rawPokeData = await fetch(poke.pokemon.url);
        const pokeData = await rawPokeData.json();
        const currentPokemon = {
          name: poke.pokemon.name,
          properties: pokeData,
        };
        setPokemons((pokemons) => [...pokemons, currentPokemon]);
      });
    };
    getPokemons();
  }, []);

  if (pokemons.length === 0) {
    return (
      <div className="left-parent">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (pokemons === "not found") {
    return "This location doesn't seem to have any pokémon";
  }

  console.log(pokemons[0].properties.sprites.back_default.split('https://'));

  return (
    <div>
      <div className="cardTitle">Pokémon in the area</div>
      <div className="left-parent">
        {selected ? (
          <div className="selectedCard" key={selected.name}>
            <img src={'https://' + selected.sprites.front_default.split('https://')[selected.sprites.front_default.split('https://').length - 1]} alt={selected.name} />
            <p>{selected.name}</p>

            <div className="selectedcardStat">
              <div className="stat">
                <div>HP</div>
                <div>{selected.stats[0].base_stat}</div>
              </div>
              <div className="stat">
                <div>ATT</div>
                <div>{selected.stats[1].base_stat}</div>
              </div>
              <div className="stat">
                <div>DEF</div>
                <div>{selected.stats[2].base_stat}</div>
              </div>
            </div>
          </div>
        ) : (
          pokemons.map((pokemon) => (
            <div className="newCard" key={pokemon.name}>
              <img src={'https://' + pokemon.properties.sprites.front_default.split('https://')[pokemon.properties.sprites.front_default.split('https://').length - 1]} alt={pokemon.name} />
              <p>{pokemon.name}</p>
              <div className="cardStat">
                <div className="stat">HP {pokemon.properties.stats[0].base_stat}</div>
                <div className="stat">ATT {pokemon.properties.stats[1].base_stat}</div>
                <div className="stat">DEF {pokemon.properties.stats[2].base_stat}</div>
              </div>
              <button onClick={() => select(pokemon.properties)}>Select</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export { ListPokemons };
