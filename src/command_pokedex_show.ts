import { State } from "./state.js";


export async function pokedexShow(state: State): Promise<void> {
    for (let p in state.pokedex) {
        console.log(`- ${p}`);
    }
}