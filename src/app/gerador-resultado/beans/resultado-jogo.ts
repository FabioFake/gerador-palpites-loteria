export class ResultadoJogo{

    public dezenas:Array<number>;

    constructor( private numeroDezenas: number){
        this.dezenas = new Array<number>(numeroDezenas);
    }

    public setDezenas(dezenas : Array<number>){
        this.dezenas = dezenas;
    }
}