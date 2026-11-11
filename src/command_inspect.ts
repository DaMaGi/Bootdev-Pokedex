import { State } from "./state.js";
import type { Pokemon } from "./pokeapi.js";

export async function inspect(state: State, poke: Pokemon["name"] | Pokemon["id"]): Promise<void> {

}