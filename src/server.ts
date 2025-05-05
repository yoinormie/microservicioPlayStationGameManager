import dotenv from 'dotenv';
dotenv.config()
import app from './Config/config'
import route from './Routes/playstation.route';
/**
 * Clase que define el puerto por el que va a escuchar el servidor y lo activa, mandando un mensaje por consola
 * También importa la clase playStationMicroservice para que acepte los endpoints
 */

const port = process.env.PORT
const commonURLEndpoint = '/playStation'

app.listen(port, () => {
    console.log(`Microservicio iniciado en el puerto ${port}`)
})

app.use(commonURLEndpoint, route)