const pokeLocationURL= "https://pokeapi.co/api/v2/location-area/";

import { State } from "./state.js";


export async function commandMapBack(state: State): Promise<void> {
    if (!state.prevLocationsURL) {
        console.log("You're already at the first page.");
        return;
    }

    const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    locations.results.map((loc) => { console.log(`${loc.name}`) });
    state.prevLocationsURL = locations.previous;
    state.nextLocationsURL = locations.next;
}