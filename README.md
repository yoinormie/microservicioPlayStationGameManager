# MicroservicioPlayStationGameManager
Este microservicio es el encargado de acceder a PlayStation Network y poder obtener los datos de un usuario y sus juegos con ciertas estadísticas sobre ellos (progreso de trofeos, última vez jugado, etc...)

## Tecnologías
- Node.js
- TypeScript
- Express.js
- Zod
- PSN-API
- Axios

## Uso del microservicio
1. Instalar [Node.JS](https://nodejs.org/en/download) en tu dispositivo 
2. Clonar el repositorio
``
git clone https://github.com/yoinormie/microservicioPlayStationGameManager.git // git clone git@github.com:yoinormie/microservicioPlayStationGameManager.git
``
3. Instalar las siguientes dependencias
`` 
npm install 
``
4. Crear tu archivo .env
**Para esto tienes que tener las siguientes variables**
PORT: #Define el puerto por el que va a escuchar tu microservicio
MYNPSSO: #Clave necesaria para utilizar PSN-API. Para obtenerla, inicia sesión en tu navegador y visita [este enlace](https://ca.account.sony.com/api/v1/ssocookie)(en el mismo navegador) y te la dará en un JSON (gracias a una cookie persistente). Se recomienda no usar la cuenta principal, ya que puede ser inhabilitada/suspendida.

5. Uso de la Api

**/playstation/searchuserwithan**
Obtiene los datos de un usuario 
#### Body 
//Poner body
#### Response
//Poner Response

**/playstation/searchgameswithaid**
Obtiene los juegos jugados (solo los jugados) por un usuario
#### Body
//Poner body
#### Response
//Poner response

6. Licencia
Los detalles de la licencia de este software están en el archivo LICENSE
