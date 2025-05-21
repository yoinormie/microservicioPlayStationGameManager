/**
 * Clase que define a un usuario con sus características básicas para identificarlo
 */
export class userPlayStationNetwork {
    private onlineID: string
    private accountID: string
    private country: string
    private language: string
    private isPSPlus: boolean
    constructor(
        onlineID: string,
        accountID: string,
        country: string,
        language: string,
        isPSPlus: boolean
    ) {
        this.onlineID = onlineID
        this.accountID = accountID
        this.country = country
        this.language = language
        this.isPSPlus = isPSPlus
    }

    public toString() {
        return {
            onlineID: this.onlineID,
            accountID: this.accountID,
            country: this.country,
            language: this.language,
            isPSPlus: this.isPSPlus,
        }
    };
}