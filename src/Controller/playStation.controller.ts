import {Response, Request} from 'express';
import { Axios } from 'axios';
import { getAccountName, getAccountGames } from '../Services/playstation.service'
import * as psn from 'psn-api';
import { searchUserANSchema,  getGamesWithAIDSchema} from '../Schemas/playStation.shema';

const accessCode = await psn.exchangeNpssoForAccessCode("PIMCgzdsGiw9BTu2cFlGGGsLfy70QmtnoZI21rCN8MX3fjjMLcMO1QHdoJ1qtwvm")
const authorization = await psn.exchangeAccessCodeForAuthTokens(accessCode)

export const getUserWithAN = async (req: Request, res: Response) => {
    let bodyParsed = searchUserANSchema.safeParse(req.body)
    if (bodyParsed.success) {
        var username = bodyParsed.data.username
        const userToSend = await getAccountName(username, authorization)
        //Llamada a microservicio de spring boot y finaliza
        res.json(userToSend)
    }

}

export const getGamesWithAID = async (req: Request, res: Response) => {
    let bodyParsed = getGamesWithAIDSchema.safeParse(req.body)
    if(bodyParsed.success){
        const envolvedLists = await getAccountGames(bodyParsed.data.accountID, authorization)
        const gamesList = envolvedLists.getUserGames()
        const userPropertyGames = envolvedLists.getUserPropertyGames()
        //Llamada a los endpoints de spring boot y finaliza
        res.json(gamesList)
    }
    
}
