import express from 'express'
/**
 * Clase que define qué va a usar el servidor (en este caso express con json) y la exporta para que la usen otras clases 
 */
const app = express()

app.use(express.json())

export default app