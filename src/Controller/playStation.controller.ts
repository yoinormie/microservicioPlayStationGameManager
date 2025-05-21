import {Response, Request} from 'express';
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
        res.json(userToSend)
    }

}

export const getGamesWithAID = async (req: Request, res: Response) => {
    let bodyParsed = getGamesWithAIDSchema.safeParse(req.body)
    if(bodyParsed.success){
        const envolvedLists = await getAccountGames(bodyParsed.data.accountID, authorization)
        const gamesList = envolvedLists.getUserGames()
        const userPropertyGames = envolvedLists.getUserPropertyGames()
        res.json(gamesList)
        //LLamar a spring boot para guardar la relación jugador/juego
                
    }
    
}
