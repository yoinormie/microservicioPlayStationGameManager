/**
 * Clase para representar un juego individual
 */

import { TrophyCounts } from "psn-api"


export class gamePlayStation{
    private npCommunicationId : string
    private gameTitle : string
    private platform : string
    private totalTrophies : TrophyCounts
    constructor(
       npCommunicationId : string,
       gameTitle : string,
       platform : string,
       totalTrophies : TrophyCounts
    ){
        this.npCommunicationId = npCommunicationId
        this.gameTitle = gameTitle
        this.platform = platform
        this.totalTrophies = totalTrophies
    }
    public getNpCommunicationId(): string {
      return this.npCommunicationId;
    }
  
    public getGameTitle(): string {
      return this.gameTitle;
    }
  
    public getPlatform(): string {
      return this.platform;
    }
  
    public getTotalTrophies(): TrophyCounts {
      return this.totalTrophies;
    }
    public toString() {
        return {
          npCommunicationId: this.npCommunicationId,
          gameTitle: this.gameTitle,
          platform: this.platform,
          totalTrophies: this.totalTrophies,
        };
      }
}