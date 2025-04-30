/**
 * Clase que será la encargada de mostrar cuantos trofeos tiene un juego y cuantos le quedan al jugador.
 */

export class TrophyCounts{
    constructor(
        bronze : number,
        silver : number,
        gold : number,
        platinum : boolean
    ){}

    static fromObject(obj: { bronze: number; silver: number; gold: number; platinum: boolean; }) {
        return new TrophyCounts(obj.bronze, obj.silver, obj.gold, obj.platinum);
      }
}