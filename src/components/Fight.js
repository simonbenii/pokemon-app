import { useEffect, useState } from "react";

function randomNumberGenerate(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function calculateDamage(attack, deffens) {
  return ((((2 / 5 + 2) * attack * 60) / deffens / 50 + 2) * randomNumberGenerate(217, 255)) / 255;
}

function Fight({ ownPokemon, enemyPokemon, resetButton, catchPokemon }) {
  const [ownPokeStat, setOwnPokeStat] = useState(ownPokemon);
  const [enemyPokeStat, setEnemyPokeStat] = useState(enemyPokemon);
  const [battleStage, setBattleStage] = useState("enemy");
  const [ownPokeHP, setOwnPokeHP] = useState(ownPokeStat.stats[0].base_stat);
  const [enemyPokeHP, setEnemyPokeHP] = useState(enemyPokeStat.stats[0].base_stat);
  const [winner, setWinner] = useState(null);

  const attackHandler = () => {
    if (battleStage === "enemy") {
      const attack = enemyPokeStat.stats[1].base_stat;
      const deffense = ownPokeStat.stats[2].base_stat;
      const dmg = Math.floor(calculateDamage(attack, deffense));
      const calculate = ownPokeHP - dmg <= 0 ? 0 : ownPokeHP - dmg;

      setOwnPokeHP(calculate);
      setBattleStage("own");
    }

    if (battleStage === "own") {
      const attack = ownPokeStat.stats[1].base_stat;
      const deffense = enemyPokeStat.stats[2].base_stat;
      const dmg = Math.floor(calculateDamage(attack, deffense));
      const calculate = enemyPokeHP - dmg <= 0 ? 0 : enemyPokeHP - dmg;

      setEnemyPokeHP(calculate);
      setBattleStage("enemy");
    }
  };

  useEffect(() => {
    if (ownPokeHP <= 0 || enemyPokeHP <= 0) {
      setBattleStage("finish");
      if (enemyPokeHP > 0) {
        setWinner(enemyPokeStat);
      }

      if (ownPokeHP > 0) {
        setWinner(ownPokeStat);
        catchPokemon(enemyPokeStat.id);
      }
    }
  }, [ownPokeHP, enemyPokeHP, winner]);

  return (
    <div>
      {winner ? (
        <div>
          <div className="selector-title">
            <p>{ownPokeHP > 0 ? "You win" : "You lose"}</p>
          </div>
          <div className="winnerBox">
            <div className="winnerCard">
              <img src={'https://' + winner.sprites.versions["generation-v"]["black-white"].animated.front_default.split('https://')[winner.sprites.versions["generation-v"]["black-white"].animated.front_default.split('https://').length - 1]} alt={winner.name} />
              <p>{winner.name}</p>
              <div className="fightcardStat">
                <div className="stat">
                  <div>HP</div>
                  <div>{winner.stats[0].base_stat}</div>
                </div>
                <div className="stat">
                  <div>ATT</div>
                  <div>{winner.stats[1].base_stat}</div>
                </div>
                <div className="stat">
                  <div>DEF</div>
                  <div>{winner.stats[2].base_stat}</div>
                </div>
              </div>
              <div className="pockemonHp">{Math.max(ownPokeHP, enemyPokeHP)}</div>
            </div>
            <button onClick={resetButton}>Back to areas</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="selector-title">
            <p>Fighting stage</p>
          </div>
          <div className="wrapper">
            <div className="cardTitle">Enemy pokémon</div>
            <div className="one">
              <div className="selectCard">
                <img src={'https://' + enemyPokemon.sprites.front_default.split('https://')[enemyPokemon.sprites.front_default.split('https://').length - 1]} alt={enemyPokemon.name} />
                <p>{enemyPokemon.name}</p>
                <div className="fightcardStat">
                  <div className="stat">
                    <div>HP</div>
                    <div>{enemyPokemon.stats[0].base_stat}</div>
                  </div>
                  <div className="stat">
                    <div>ATT</div>
                    <div>{enemyPokemon.stats[1].base_stat}</div>
                  </div>
                  <div className="stat">
                    <div>DEF</div>
                    <div>{enemyPokemon.stats[2].base_stat}</div>
                  </div>
                </div>
                <div className="pockemonHp">
                  {enemyPokeHP} / {enemyPokemon.stats[0].base_stat}
                </div>
              </div>
            </div>
            <div className="cardTitle">My pokémon</div>
            <div className="two">
              <div className="selectCard">
                <img src={'https://' + ownPokemon.sprites.front_default.split('https://')[ownPokemon.sprites.front_default.split('https://').length - 1]} alt={ownPokemon.name} />
                <p>{ownPokemon.name}</p>
                <div className="fightcardStat">
                  <div className="stat">
                    <div>HP</div>
                    <div>{ownPokemon.stats[0].base_stat}</div>
                  </div>
                  <div className="stat">
                    <div>ATT</div>
                    <div>{ownPokemon.stats[1].base_stat}</div>
                  </div>
                  <div className="stat">
                    <div>DEF</div>
                    <div>{ownPokemon.stats[2].base_stat}</div>
                  </div>
                </div>
                <div className="pockemonHp">
                  {ownPokeHP} / {ownPokemon.stats[0].base_stat}
                </div>
              </div>
            </div>
          </div>
          <button disabled={ownPokeHP <= 0 || enemyPokeHP <= 0 ? true : false} onClick={attackHandler}>
            Attack - {battleStage === "enemy" ? enemyPokemon.name : ownPokemon.name}
          </button>
        </div>
      )}
    </div>
  );
}

export { Fight };
