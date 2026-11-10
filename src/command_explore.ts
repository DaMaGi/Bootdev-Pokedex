import { State } from "./state.js";


export async function exploreArea(state: State, area: string): Promise<void> {
    const loc = await state.pokeAPI.fetchLocation(area);
    console.log(`Exploring ${loc.name}\nFound Pokemon:`)
        for (let poke of loc.pokemon_encounters)
            console.log(`- ${poke.pokemon.name}`);
}