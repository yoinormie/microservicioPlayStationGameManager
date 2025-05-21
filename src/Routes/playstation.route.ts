import { Router } from "express"
import {getUserWithAN, getGamesWithAID} from '../Controller/playStation.controller'
import { ValidateBody } from "../Middleware/playStation.middleware"
import {searchUserANSchema, getGamesWithAIDSchema} from '../Schemas/playStation.shema'

/**
 * Clase que define los diferentes endPoints que va a usar la aplicación
 */
const route = Router();
//Busca a un usuario a través de su nombre de usuario (el visible a todos los jugadores)
route.post('/searchuserwithan', ValidateBody(searchUserANSchema), getUserWithAN);
//Consigue los juegos del usuario y forma la relación de un juego con su usuario
route.post('/searchgameswithaid', ValidateBody(getGamesWithAIDSchema), getGamesWithAID);

export default route;
