import { TrophyCounts } from "psn-api"

/**
 * Clase para representar la propiedad de un juego con el usuario
 * También muestra las características en ese juego
 */
export class gameProperty{
    private accountID : string
    private npCommnicationID : string
    private trophyProgress : TrophyCounts
    private percentageProgress : number
    private lastUpdateTime : string
    constructor(
        accountID : string,
        npCommunicationID : string,
        trophyProgress : TrophyCounts,
        percentageProgress : number,
        lasUpdateTime : string
    ){
        this.accountID = accountID
        this.npCommnicationID = npCommunicationID
        this.trophyProgress = trophyProgress
        this.percentageProgress = percentageProgress
        this.lastUpdateTime = lasUpdateTime
    }
    public getAccountID(): string {
      return this.accountID;
    }
  
    public getNpCommunicationID(): string {
      return this.npCommnicationID;
    }
  
    public getTrophyProgress(): TrophyCounts {
      return this.trophyProgress;
    }
  
    public getPercentageProgress(): number {
      return this.percentageProgress;
    }
  
    public getLastUpdateTime(): string {
      return this.lastUpdateTime;
    }
    public toString() {
        return {
          accountID: this.accountID,
          npCommnicationID: this.npCommnicationID,
          trophyProgress: this.trophyProgress,
          percentageProgress: this.percentageProgress,
          lastUpdateTime: this.lastUpdateTime,
        };
      }
}