import app from './config'
import './playStationMicroservice'
/**
 * Clase que define el puerto por el que va a escuchar el servidor y lo activa, mandando un mensaje por consola
 * También importa la clase playStationMicroservice para que acepte los endpoints
 */
const port = 3050

app.listen(port, () => {
    console.log(`Microservicio iniciado en el puerto ${port}`)
})