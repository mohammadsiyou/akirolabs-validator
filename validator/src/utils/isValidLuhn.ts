export function isValidLuhn(token: string) {
    const digits = String(token).split("").map(Number);

    let checkDigit = 0;
    let double = true;

    for (let i = digits.length - 2; i >= 0; i--) {
        let digit = digits[i];

        checkDigit += double ? (digit > 4 ? digit * 2 - 9 : digit * 2) : digit;

        double = !double;
    }

    return 10 - (checkDigit % 10) === digits[digits.length - 1];
}
