import * as express from 'express'; 
import app from '../config';
import { exchangeRefreshTokenForNewAccessToken } from '../Utilities/accountUtilities'
import * as psn from 'psn-api';

/*
async function exchangeKey4AccessCode() {
    const accessCode = await psn.exchangeNpssoForAccessCode("tsacdKRqFnmniO1OuUbK2WBuHiOOTaBxz94TytWnN8RqyCYw7HOHjg2QA8FZVgvI");
    return accessCode;
}

async function gettingAuthorization(accessCode:String) {
    const authorization = await psn.exchangeAccessCodeForAuthTokens(String(accessCode))
    return authorization
}*/

const accessCode = await psn.exchangeNpssoForAccessCode(process.env.MYNPSSO as string)
const authorization = await psn.exchangeAccessCodeForAuthTokens(String(accessCode))

app.get('/', (req: express.Request, res: express.Response) => {
    res.json({
        message: "Hola desde el microservicio de PlayStation"
    });
});

