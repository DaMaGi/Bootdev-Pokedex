import { createInterface } from "readline";
import { getCommands } from "./commands.js";


const readLine = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
});

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(/[\s\W+]/).filter(Boolean) || [];
}

export function startREPL() {
    const commands = getCommands();
    readLine.prompt();
    readLine.on("line", (input) => {
        let cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            console.log("");
            readLine.prompt();
        }   
        let commandFound = false;
        for (let command in commands) {
            if (cleanedInput[0] === command) {
                commandFound = true;
                commands[command].callback();
                readLine.prompt();
                break;
            }
        }
        if (!commandFound) {
            console.log("Unknown command");
            readLine.prompt();
        }
  });
}