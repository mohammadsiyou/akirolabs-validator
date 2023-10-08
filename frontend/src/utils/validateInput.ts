export function validateInput(input: string) {
    try {
        const chars = input.split(',').filter(char => char !== '');

        const isInvalied = chars.some(char => new RegExp(/^[0-9]$/).test(char) === false)

        if (isInvalied)
            return "Every digit must be between 0-9";
        else if (new Set(chars).size !== chars.length)
            return "There is a duplicate digit";
    }
    catch {
        return "Input is not valid";
    }

    return "";
}
