import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
/**
 * Método que, a través de la definición de un schema de zod, deja pasar una llamada http o le envía un error.
 * @param schema qué es necesario para que el body sea válido (definidos en ../Schemas/playStation.schema.ts)
 * @returns 
 */
export const ValidateBody = (schema : z.ZodType<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next();
        } catch (error) {
            res.status(400).json({error:"Invalid body"});
        }
    }
}