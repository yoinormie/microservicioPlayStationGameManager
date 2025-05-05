import { Router } from "express"
import {getUserWithAN, getGamesWithAID} from '../Controller/playStation.controller'
import { ValidateBody } from "../Middleware/playStation.middleware"
import {searchUserANSchema, getGamesWithAIDSchema} from '../Schemas/playStation.shema'
import app from "../Config/config"

const route = Router();
route.post('/searchuserwithan', ValidateBody(searchUserANSchema), getUserWithAN);
route.post('/searchgameswithaid', ValidateBody(getGamesWithAIDSchema), getGamesWithAID);

export default route;
