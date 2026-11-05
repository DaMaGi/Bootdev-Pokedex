import { getCommands } from "./commands.js";


export function commandHelp(): void {
    console.log(`Welcome to the Pokedex!
Usage:
`);
    for (const commandName in getCommands()) {
        const command = getCommands()[commandName];
        console.log(`- ${command.name}: ${command.description}`);
    }
}