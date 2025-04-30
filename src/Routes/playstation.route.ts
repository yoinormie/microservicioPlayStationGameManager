import { Router } from "express"
import {getUserWithAN} from '../Controller/playStation.controller'
import { ValidateBody } from "../Middleware/playStation.middleware"
import {searchUserANSchema} from '../Schemas/playStation.shema'
import app from "../Config/config"

const route = Router();
route.post('/searchuserwithan', ValidateBody(searchUserANSchema), getUserWithAN);
route.post('/searchgameswithaid',);

export default route;
