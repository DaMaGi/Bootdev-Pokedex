export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(/[\s\W+]/).filter(Boolean) || [];
}