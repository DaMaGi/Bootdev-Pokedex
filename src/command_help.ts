import { State } from "./state.js";


export async function commandHelp(state: State): Promise<void> {
    console.log(`Welcome to the Pokedex!
Usage:
`);
    for (const commandName in state.commands) {
        console.log(`- ${state.commands[commandName].name}: ${state.commands[commandName].description}`);
    }
}