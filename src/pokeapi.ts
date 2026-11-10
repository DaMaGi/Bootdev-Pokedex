import { Cache } from "./pokecache.js";


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
    pokemon_encounters: { pokemon: { name: string, url: string } }[]
};


export class PokeAPI {
    constructor(interval: number = 300_000) {
        this.cache = new Cache(interval);
    }

    private static readonly baseURL = "https://pokeapi.co/api/v2";
    cache: Cache;

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const fullURL = pageURL ?? PokeAPI.baseURL + "/location-area/";
        const isInCache = this.cache.get<ShallowLocations>(fullURL);

        if (isInCache !== undefined) return isInCache;

        try {
            const locations = await fetch(fullURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json());

            this.cache.add(fullURL, locations);
            return locations;
        }
        catch (error) {
            console.error("Error fetching locations: ", error);
            throw error;
        };
    }

    async fetchLocation(location: Location["name"] | Location["id"]): Promise<Location> {
        const fullURL = PokeAPI.baseURL + `/location-area/${location}`;
        const isInCache = this.cache.get<Location>(fullURL);

        let loc: Location;

        if (isInCache !== undefined) loc = isInCache;

        else {
            try {
                loc = await fetch(fullURL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.json());
                this.cache.add(fullURL, loc);
            }
            catch (error) {
                console.error("Error fetching location details: ", error);
                throw error;
            };
        }

        return loc;
    }

    closeCache() {
        this.cache.stopReapLoop();
    }
}
