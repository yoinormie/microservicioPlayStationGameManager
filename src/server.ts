import app from './config'
import './playStationMicroservice'

const port = 3050

app.listen(port, () => {
    console.log(`Microservicio iniciado en el puerto ${port}`)
})