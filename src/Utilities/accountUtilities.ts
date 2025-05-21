import * as psn from 'psn-api';

//Usa el token de refresco que tiene una autorización caducada para obtener una nueva válida
export async function exchangeRefreshTokenForNewAccessToken(refreshToken: String) {
    const newAuthorization = await psn.exchangeRefreshTokenForAuthTokens(String(refreshToken));
    return newAuthorization;
}

//Como su nombre indica, comprueba si el token está expirado según un tiempo determinado y, si es así, lo renueva
export function calculateAuthorizationExpireDate(authorization: psn.AuthTokensResponse): boolean{
    const actualMoment = new Date()
    const expirationDate = new Date(actualMoment.getDate() + authorization.expiresIn * 1000);
    return expirationDate.getDate() < Date.now()
}

