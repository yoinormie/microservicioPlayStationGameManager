import * as psn from 'psn-api';

export async function exchangeRefreshTokenForNewAccessToken(refreshToken: String) {
    const newAuthorization = await psn.exchangeRefreshTokenForAuthTokens(String(refreshToken));
    return newAuthorization;
}

export function calculateAuthorizationExpireDate(authorization: psn.AuthTokensResponse): boolean{
    const actualMoment = new Date()
    const expirationDate = new Date(actualMoment.getDate() + authorization.expiresIn * 1000);
    return expirationDate.getDate() < Date.now()
}

