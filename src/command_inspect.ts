import { State } from "./state.js";
import type { Pokemon } from "./pokeapi.js";


export async function inspectPokemon(state: State, poke: string): Promise<void> {
    if (poke in state.pokedex) {
        const pokeObjFound = state.pokedex[poke];
        console.log(
`Name: ${pokeObjFound.name}
ID: ${pokeObjFound.id}
Height: ${pokeObjFound.height}
Weight: ${pokeObjFound.weight}
Abilities:${pokeObjFound.abilities.map(ab => " " + ab.ability.name)}
Stats: \n${pokeObjFound.stats.map((x) => { if (x !== undefined) return `      - ${x.stat.name}: ${x.base_stat}`}).join("\n")}
Types: \n${pokeObjFound.types.map((t) => { if (t.type.name !== undefined) return  `      - ${t.type.name}`}).join("\n")}`);
    }
    else console.log("You have not caught that Pokemon yet.");
}
