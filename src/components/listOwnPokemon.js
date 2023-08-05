import { useEffect, useState } from "react";

function ListOwnPokemons({ selecta, selected, usersPokemon }) {
  const [pPokemons, setPPokemons] = useState([]);

  useEffect(() => {
    const getUserPokemon = async () => {
      setPPokemons([]); // reset hook
      await usersPokemon.map(async (pokemon) => {
        const rawData = await fetch(pokemon);
        const data = await rawData.json();
        setPPokemons((pPokemons) => [...pPokemons, data]);
      });
    };
    getUserPokemon();
  }, []);

  if (pPokemons.length === 0) {
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

  return (
    <div>
      <div className="cardTitle">My pokémon</div>
      <div className="right-parent">
        {selected ? (
          <div className="selectedCard" key={selected.name}>
            <img src={selected.sprites.front_default} />
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
          pPokemons.map((pokemon) => (
            <div className="newCard" key={pokemon.name}>
              <img src={pokemon.sprites.front_default} />
              <p>{pokemon.name}</p>

              <div className="cardStat">
                <div className="stat">HP {pokemon.stats[0].base_stat}</div>
                <div className="stat">ATT {pokemon.stats[1].base_stat}</div>
                <div className="stat">DEF {pokemon.stats[2].base_stat}</div>
              </div>
              <button onClick={() => selecta(pokemon)}>Select</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export { ListOwnPokemons };
