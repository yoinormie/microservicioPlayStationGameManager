/**
 * Clase que define a un usuario con sus características 
 */
class userData{
    constructor(private accountID: string, private onlineID: string, 
        private country:string, private id:string, private language: string, private games: gameInfo[] | null) {
        this.accountID = accountID
        this.onlineID = onlineID
        this.country = country
        this.id = id
        this.language = language
    }

    public getInfo(): string {
        return `ID: ${this.id}, Account ID: ${this.accountID}, Online ID: ${this.onlineID}, País: ${this.country}, Idioma: ${this.language}`;
    }

}

function parseUserJson(jsonData:any[]): userData {
    const firstItem = jsonData[0];

    return new userData(
        firstItem.socialMetadata.accountId,
        firstItem.socialMetadata.onlineId,
        firstItem.socialMetadata.country,
        firstItem.id,
        firstItem.socialMetadata.language,
        null
    );
}

class gameInfo{
    constructor(private title: string, private hoursPlayed: number, private platform: string, private trophies: Trophie[]){
        this.title = title
        this.platform = platform
    }

    
    setTitle(title:string){
        this.title = title
    }

    getTitle(){
        return this.title
    }

    setHoursPlayed(hoursPlayed: number){
        this.hoursPlayed = hoursPlayed
    }

    getHoursPlayed(){
        return this.hoursPlayed
    }
    
}

class Trophie{
    constructor(private categorie: string){}
}