import * as accountUtils from '../Utilities/accountUtilities'
import * as psn from 'psn-api';
import { userPlayStationNetwork } from '../Models/playStation.user';
import { gamePlayStation } from '../Models/playStation.game';
import { gameProperty } from '../Models/playStation.property';
/**
 * Método que busca a un usuario a través de un username
 * @param accountUsername username de un usuario  
 * @param authorization parámetro obtenido a través del NPSSO 
 * @returns un perfil de PSN
 */

export async function getAccountName(accountUsername: string, authorization: psn.AuthTokensResponse) {
    let response
    //Calcula un tiempo por si la autorización está caducada y, si lo está, la renueva con el NPSSO
    if (accountUtils.calculateAuthorizationExpireDate(authorization)) {
        console.log('El Access Token ha expirado, obteniendo uno nuevo...');
        const updatedAuthorization = await accountUtils.exchangeRefreshTokenForNewAccessToken(authorization.refreshToken);
        response = await getProfile(updatedAuthorization)
    } else {
        response = await getProfile(authorization);
    }

    const accountName: string = response.domainResponses[0].results[0].socialMetadata.onlineId
    const accountId: string = response.domainResponses[0].results[0].socialMetadata.accountId
    const country: string = response.domainResponses[0].results[0].socialMetadata.country
    const language: string = response.domainResponses[0].results[0].socialMetadata.language
    const isPSPlus: boolean = response.domainResponses[0].results[0].socialMetadata.isPsPlus

    return new userPlayStationNetwork(accountName, accountId, country, language, isPSPlus)

  async function getProfile( authorization: psn.AuthTokensResponse) {
    return await psn.makeUniversalSearch(
      authorization,
      accountUsername,
      "SocialAllAccounts"
    );
  }
}

/**
 * Clase que, a través del accountID recogido de un usuario y una autorización formada con el NPSSO, se obtienen los juegos y progresos de un jugador
 * @param accountId id conseguido con el método anterior
 * @param authorization autorización formada a partir del NPSSO
 * @returns juegos de un perfil y la relación con estos (progreso, tiempo de juego, etc...)
 */
export async function getAccountGames(accountId: string, authorization: psn.AuthTokensResponse) {
    var userGames
    var gamesList: gamePlayStation[] = []
    var userPropertyGames: gameProperty[] = []
    if (accountUtils.calculateAuthorizationExpireDate(authorization)) {
        console.log('El Access Token ha expirado, obteniendo uno nuevo...');
        const updatedAuthorization = await accountUtils.exchangeRefreshTokenForNewAccessToken(authorization.refreshToken);
        userGames = await obtenerJuegos()
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
        userGames = await obtenerJuegos();
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
    

  async function obtenerJuegos() {
    return await psn.getUserTitles(
      { accessToken: authorization.accessToken },
      accountId
    );
  }
}
//Clase creada para poder devolver los juegos y la propiedad enre juego/jugador en un sólo metodo 
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

