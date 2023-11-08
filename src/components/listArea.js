import { useEffect, useState } from "react";
import "../ListArea.css";

import canalaveCity from "./../img/HGSS_Seafoam_Islands-Day.png";
import eternaCity from "./../img/HGSS_Viridian_Forest-Day.png";
import pastoriaCity from "./../img/HGSS_Victory_Road-Day.png";
import sunyshoreCity from "./../img/HGSS_Ruins_of_Alph-Day.png";
import sinnohPokemonLeague from "./../img/HGSS_National_Park-Day.png";
import oreburghMine from "./../img/HGSS_Mt._Mortar-Day.png";
import valleyWindworks from "./../img/HGSS_Cerulean_Cave-Night.png";
import eternaForest from "./../img/HGSS_Ilex_Forest-Day.png";
import fuegoIronworks from "./../img/HGSS_Bell_Tower-Day.png";
import mtCoronet from "./../img/HGSS_Mt._Silver-Day.png";
import greatMarsh from "./../img/HGSS_Slowpoke_Well-Day.png";
import solaceonRuins from "./../img/HGSS_Ruins_of_Alph-Day.png";
import sinnohVictoryRoad from "./../img/HGSS_Victory_Road-Day.png";
import ravagedPath from "./../img/HGSS_Dark_Cave-Route_31-Day.png";
import orehurghGate from "./../img/HGSS_Union_Cave-Day.png";
import starkMountain from "./../img/HGSS_Mt._Silver-Day.png";
import springPath from "./../img/HGSS_Sprout_Tower-Day.png";
import turnbackCave from "./../img/HGSS_Rock_Tunnel-Day.png";
import snowpointTemple from "./../img/HGSS_Ice_Cave-Day.png";
import waywardCave from "./../img/HGSS_Dark_Cave-Route_45-Day.png";

const locationImages = {
  "canalave-city": canalaveCity,
  "eterna-city": eternaCity,
  "pastoria-city": pastoriaCity,
  "sunyshore-city": sunyshoreCity,
  "sinnoh-pokemon-league": sinnohPokemonLeague,
  "oreburgh-mine": oreburghMine,
  "valley-windworks": valleyWindworks,
  "eterna-forest": eternaForest,
  "fuego-ironworks": fuegoIronworks,
  "mt-coronet": mtCoronet,
  "great-marsh": greatMarsh,
  "solaceon-ruins": solaceonRuins,
  "sinnoh-victory-road": sinnohVictoryRoad,
  "ravaged-path": ravagedPath,
  "oreburgh-gate": orehurghGate,
  "stark-mountain": starkMountain,
  "spring-path": springPath,
  "turnback-cave": turnbackCave,
  "snowpoint-temple": snowpointTemple,
  "wayward-cave": waywardCave,
};

function ListArea(prop) {
  const clickEvent = prop.clickEvent;

  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const rawLocations = await fetch("https://pokeapi.co/api/v2/location");
      const locaitons = await rawLocations.json();
      setLocation(locaitons.results);
    };

    fetchData();
  }, []);

  if (!location) {
    return (
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
    );
  }

  return (
    <div className="areaBox">
      {location.map((x) => (
        <div onClick={() => clickEvent(x)} className="location-grid-item btn third" key={x.url} style={{ backgroundImage: `url(${locationImages[x.name]})`, padding: "60px" }}>
          {x.name}
        </div>
      ))}
    </div>
  );
}

export { ListArea };
