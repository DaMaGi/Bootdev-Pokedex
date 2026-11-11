import { State } from "./state.js";

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(/[\s\.,;!?:]+/).filter(Boolean) || [];
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
                    await commands[command].callback(state, ...cleanedInput.slice(1));
                    break;
                }
                catch (error) {
                    console.log(`Can't compute the command: ${commands[command].name}.`);
                    console.error(`Error executing the command :\n${error}`);
                }
            }
        }
        if (!commandFound) {
            console.log("Unknown command");
        }
        state.readLine.prompt();
    });
}