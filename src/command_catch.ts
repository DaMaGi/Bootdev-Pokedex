import type { State } from "./state.js";


const minChanceToCatch = 0.125;


export async function commandCatch(state: State, pokemon: string | number): Promise<void> {
    const poke = await state.pokeAPI.fetchPokemon(pokemon);
    if (poke.name === undefined) {
        console.log(`No Pokemon with the name ${pokemon} was found.`);
        return;
    }
    if (poke.name in state.pokedex) {
        console.log(`${poke.name} is already in the Pokedex.`);
        return;
    }
    console.log(`Throwing a Pokeball at ${poke.name}...`);
    if (isCaught(poke.base_experience)) {
        console.log(`${poke.name} was caught!`);
        state.pokedex[poke.name] = poke;
    }
    else {
        console.log(`${poke.name} escaped!`)
    }
}


function isCaught(xp: number): boolean {
    if (xp <= 0) throw Error("Invalid Pokemon XP value.");
    if (Math.random() <= (Math.max(1 - xp / 110, minChanceToCatch))) {
        return true;
    }
    return false;
}
