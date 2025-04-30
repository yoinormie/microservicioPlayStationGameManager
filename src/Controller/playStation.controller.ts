import {Response, Request} from 'express';
import {userPlayStationNetwork} from '../Models/playStation.user'
import { getAccountName, getAccountGames } from '../Services/playstation.service'
import * as psn from 'psn-api';
import { searchUserANSchema } from '../Schemas/playStation.shema';

const accessCode = await psn.exchangeNpssoForAccessCode(process.env.MYNPSSO as string)
const authorization = await psn.exchangeAccessCodeForAuthTokens(accessCode)

export const getUserWithAN = async (req: Request, res: Response) => {
    let bodyParsed = searchUserANSchema.safeParse(req.body)
    if (bodyParsed.success) {
        var username = bodyParsed.data.username
        const userToSend = await getAccountName(username, authorization)
        //Llamada a microservicio de spring boot y finaliza
    }

}
