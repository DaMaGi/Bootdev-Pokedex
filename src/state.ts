import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMapBack } from "./command_mapb.js";
import { exploreArea } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import type { Pokemon } from "./pokeapi.js";

export type State = {
    readLine: Interface;
    pokeAPI: PokeAPI;
    prevLocationsURL: string | null;
    nextLocationsURL: string | null;
    pokedex: Record<string, Pokemon>;
    commands: Record<string, CLICommand>;
}


export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};


export function initState(): State {
    return {
        readLine: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        pokeAPI: new PokeAPI(),
        prevLocationsURL: null,
        nextLocationsURL: null,
        pokedex: {},
        commands: {
            exit: {
                name: "exit",
                description: "Exit the Pokedex",
                callback: commandExit,
            },
            help: {
                name: "help",
                description: "List all available commands",
                callback: commandHelp
            },
            map: {
                name: "map",
                description: "Display Pokedex map locations",
                callback: commandMap
            },
            mapb: {
                name: "mapb",
                description: "Display previous Pokedex map locations",
                callback: commandMapBack
            },
            explore: {
                name: "explore",
                description: "Display Pokemon found in target area. Type 'explore {area_name | area_id}'",
                callback: exploreArea
            },
            catch: {
                name: "catch",
                description: "Attempt to catch a Pokemon. Type 'catch {`pokemon_name | pokemon_id}",
                callback: commandCatch
            }
        }

    }
}