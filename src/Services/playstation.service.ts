import * as accountUtils from '../Utilities/accountUtilities'
import * as psn from 'psn-api';
import axios from 'axios';
import { userPlayStationNetwork } from '../Models/playStation.user';

export async function getAccountName(accountUsername:string, authorization: psn.AuthTokensResponse){
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

    const accountId : string = response.domainResponses[0].results[0].socialMetadata.accountId
    const country : string =  response.domainResponses[0].results[0].socialMetadata.country
    const language : string = response.domainResponses[0].results[0].socialMetadata.language
    const isPSPlus : boolean = response.domainResponses[0].results[0].socialMetadata.isPsPlus

    return new userPlayStationNetwork(accountUsername,accountId,country,language,isPSPlus)
}

export async function getAccountGames(accountId:string, authorization:psn.AuthTokensResponse){
  let userGames
  if (accountUtils.calculateAuthorizationExpireDate(authorization)) {
              console.log('El Access Token ha expirado, obteniendo uno nuevo...');
              const updatedAuthorization = await accountUtils.exchangeRefreshTokenForNewAccessToken(authorization.refreshToken);
              //console.log(updatedAuthorization);
              userGames = await psn.getUserTitles(
                  { accessToken: updatedAuthorization.accessToken },
                  accountId
              );
          } else {
              userGames = await psn.getUserTitles(
                  { accessToken: authorization.accessToken },
                  accountId
              );
          }
  
    
}