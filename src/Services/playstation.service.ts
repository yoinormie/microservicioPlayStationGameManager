import * as accountUtils from '../Utilities/accountUtilities'
import * as psn from 'psn-api';
import { userPlayStationNetwork } from '../Models/playStation.user';
import { gamePlayStation } from '../Models/playStation.game';
import { gameProperty } from '../Models/playStation.property';

export async function getAccountName(accountUsername: string, authorization: psn.AuthTokensResponse) {
    let response
    if (accountUtils.calculateAuthorizationExpireDate(authorization)) {
        console.log('El Access Token ha expirado, obteniendo uno nuevo...');
        const updatedAuthorization = await accountUtils.exchangeRefreshTokenForNewAccessToken(authorization.refreshToken);
        response = await psn.makeUniversalSearch(
            updatedAuthorization,
            accountUsername,
            "SocialAllAccounts"
        );
    } else {
        response = await psn.makeUniversalSearch(
            authorization,
            accountUsername,
            "SocialAllAccounts"
        );
    }

    const accountName: string = response.domainResponses[0].results[0].socialMetadata.onlineId
    const accountId: string = response.domainResponses[0].results[0].socialMetadata.accountId
    const country: string = response.domainResponses[0].results[0].socialMetadata.country
    const language: string = response.domainResponses[0].results[0].socialMetadata.language
    const isPSPlus: boolean = response.domainResponses[0].results[0].socialMetadata.isPsPlus

    return new userPlayStationNetwork(accountName, accountId, country, language, isPSPlus)
}

export async function getAccountGames(accountId: string, authorization: psn.AuthTokensResponse) {
    var userGames
    var gamesList: gamePlayStation[] = []
    var userPropertyGames: gameProperty[] = []
    if (accountUtils.calculateAuthorizationExpireDate(authorization)) {
        console.log('El Access Token ha expirado, obteniendo uno nuevo...');
        const updatedAuthorization = await accountUtils.exchangeRefreshTokenForNewAccessToken(authorization.refreshToken);
        userGames = await psn.getUserTitles(
            { accessToken: updatedAuthorization.accessToken },
            accountId
        );
        for (const title of userGames.trophyTitles ?? []) {
            gamesList.push(
              new gamePlayStation(
                title.npCommunicationId as string,
                title.trophyTitleName as string,
                title.trophyTitlePlatform as string,
                title.definedTrophies
              )
            );
          
            userPropertyGames.push(
              new gameProperty(
                accountId,
                title.npCommunicationId as string,
                title.earnedTrophies,
                title.progress as number,
                title.lastUpdatedDateTime as string
              )
            );
          }
          return new envolvedLists(gamesList, userPropertyGames)
    } else {
        userGames = await psn.getUserTitles(
            { accessToken: authorization.accessToken },
            accountId
        );
        var i : number = 0
        for (const title of userGames.trophyTitles ?? []) {
            gamesList.push(
              new gamePlayStation(
                title.npCommunicationId as string,
                title.trophyTitleName as string,
                title.trophyTitlePlatform as string,
                title.definedTrophies
              )
            );
            userPropertyGames.push(
              new gameProperty(
                accountId,
                title.npCommunicationId as string,
                title.earnedTrophies,
                title.progress as number,
                title.lastUpdatedDateTime as string
              )
            );
          }
          return new envolvedLists(gamesList, userPropertyGames)  
    }
    
}
class envolvedLists {
    private userGames: gamePlayStation[]
    private userPropertyGames: gameProperty[]
    constructor(
        userGames: gamePlayStation[],
        userPropertyGames: gameProperty[]
    ) {
        this.userGames = userGames,
        this.userPropertyGames = userPropertyGames
    }
    public getUserGames(): gamePlayStation[] {
        return this.userGames;
      }
    
      public getUserPropertyGames(): gameProperty[] {
        return this.userPropertyGames;
      }
}

