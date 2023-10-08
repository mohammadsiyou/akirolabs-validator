export async function getValidateReq(token: string) {
    const res = await fetch(`http://localhost:3000/validate/${token}`);

    return await res.json() as { isValid: boolean };
};
