import { State } from "./state.js";


export async function commandMap(state: State): Promise<void> {
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL ?? null);
    locations.results.map((loc) => { console.log(`${loc.name}`) });
    state.prevLocationsURL = locations.previous ?? "";
    state.nextLocationsURL = locations.next ?? "";
}