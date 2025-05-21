import {z} from 'zod'
/**
 * Schemas que dan una capa extra de protección contra errores y body's inválidos.
 */
export const searchUserANSchema = z.object({
    username : z.string()
    .min(3,{message : "Debes proporcionar un usuario válido"})
    .max(16,{message : "Debes proporcionar un usuario válido"})
});  

export const getGamesWithAIDSchema = z.object({
    accountID : z.string()
    .length(19,{message: "El accountID es inválido"})
});