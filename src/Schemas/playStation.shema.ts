import {z} from 'zod'

export const searchUserANSchema = z.object({
    username : z.string()
    .min(3,{message : "Debes proporcionar un usuario válido"})
    .max(16,{message : "Debes proporcionar un usuario válido"})
});  

