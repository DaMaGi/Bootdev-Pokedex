export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const path = PokeAPI.baseURL + "/location-area/";
        try {
            const locations = await fetch(pageURL || path, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json());
            return locations;
        }
        catch (error) {
            console.error("Error fetching locations: ", error);
            throw error;
        };
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const path = PokeAPI.baseURL + `/location-area/${locationName}`;
        try {
            const location = await fetch(path, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json());
            return location;
        }
        catch (error) {
            console.error("Error fetching location details: ", error);
            throw error;
        };
    }
}

export type ShallowLocations = {
    count: number,
    next: string | null,
    previous: string | null,
    results: Location[]
};

export type Location = { 
    id: number,
    name: string,
    game_index: number,
    encounter_method_rates: [],
    location: Object,
    names: [],
    pokemon_encounters: []
};
