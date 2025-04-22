import * as accounUtils from '../Utilities/accountUtilities'
import * as psn from 'psn-api';

async function getAccountName(accountUsername:string, authorization: Promise<psn.AuthTokensResponse>){
    const auth = await authorization;
    const response = await psn.makeUniversalSearch(
        auth,
        accountUsername,
        "SocialAllAccounts"
      );
    return response.domainResponses[0]

}

async function getAccountGames(accountId:string, authorization:Promise<psn.AuthTokensResponse>){
  const auth = await authorization
  let userGames
  if (accounUtils.calculateAuthorizationExpireDate(auth)) {
              console.log('El Access Token ha expirado, obteniendo uno nuevo...');
              const updatedAuthorization = await accounUtils.exchangeRefreshTokenForNewAccessToken(auth.refreshToken);
              console.log(updatedAuthorization);
              userGames = await psn.getUserTitles(
                  { accessToken: updatedAuthorization.accessToken },
                  "7564989473352568764"
              );
          } else {
              userGames = await psn.getUserTitles(
                  { accessToken: auth.accessToken },
                  "7564989473352568764"
              );
          }
  
    
}