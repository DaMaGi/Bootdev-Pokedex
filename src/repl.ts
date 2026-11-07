import { State } from "./state.js";

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(/[\s\W+]/).filter(Boolean) || [];
}

export async function startREPL(state: State): Promise<void> {
    const commands = state.commands;
    state.readLine.prompt();
    state.readLine.on("line", async (input) => {
        let cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            console.log("");
        }
        let commandFound = false;
        for (let command in commands) {
            if (cleanedInput[0] === command) {
                commandFound = true;
                try {
                    await commands[command].callback(state);
                    break;
                }
                catch (error) {
                    console.log("Your last command could not be completed. Try again later.");
                    console.error(`There was an error while executing the command ${commands[command].name}:\n${error}`);
                }
            }
        }
        if (!commandFound) {
            console.log("Unknown command");
        }
        state.readLine.prompt();
    });
}