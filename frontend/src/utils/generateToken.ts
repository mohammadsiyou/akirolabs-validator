export function generateToken(n: number, digits: (string | number)[]) {
    let token = '';

    for (let i = 0; i < n; i++) {
        token += digits[Math.floor(Math.random() * digits.length)];
    }

    return token;
}

export function getToken(input:string){
    const inputDigits = input.split(',').filter(char => char !== '');

    const token = generateToken(16, inputDigits.length ? inputDigits : Array(10).fill(undefined).map((_, index) => index));

    const digits = String(token);

    const formatedToken = Array(4).fill(undefined).map((_, index) => digits.slice(index * 4, (index * 4) + 4)).join('-');

    return formatedToken;
}