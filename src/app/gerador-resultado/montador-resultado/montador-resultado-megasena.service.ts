import { Injectable } from '@angular/core';

import { MontadorResultadoInterface} from './montador-resultado.interface';
import { ResultadoJogo } from './../beans/resultado-jogo';

@Injectable()
export class MontadorResultadoMegasenaService implements MontadorResultadoInterface{

    private isNaTr: boolean = false;

    /** TODO Trocar por pattern identificado */
    private isNoPeriodo: boolean = false;

    /** TODO Trocar por pattern*/
    private dataInicial: string = '03/2017';
    

    private indice:number = 0;

    private QUANTIDADE_DEZENAS:number = 6;

    private resultadoJogo: ResultadoJogo;

    private resultadosJogos: Array<ResultadoJogo> = new Array();

    constructor() { 
        this.resultadoJogo = this.criarResultadoJogo();
    }

    protected criarResultadoJogo(){
        return new ResultadoJogo(this.QUANTIDADE_DEZENAS);
    }

    public adicionarResultado(linha: string): void {
       
        if (!this.isNaTr) {
            this.isNaTr = this.verificarAberturaTr(linha);
        }else if(!this.isNoPeriodo){
            this.isNoPeriodo = this.verificarPeriodo(linha, this.dataInicial);
        }else{
            
            let padraoRegex = /<td.*>(\d\d)<\/td>/;
            let match = padraoRegex.exec(linha);
            if(match){
                this.resultadoJogo.dezenas[this.indice++] = +match[1];
                if(this.indice == 6){
                    this.resultadosJogos.push(this.resultadoJogo);
                    this.resultadoJogo = this.criarResultadoJogo();
                    this.indice = 0;
                    this.isNaTr = false;
                    // 
                }
            }
        

        }

    }

    public verificarAberturaTr(linha: string): boolean {
        let padrao = new RegExp("<tr.*>");
        
        let achouTr: boolean =  padrao.test(linha);

        if(achouTr){
            
        }
        return achouTr;
    }

    public verificarPeriodo(linha: string, dataInicial: string): boolean{
        return linha.indexOf(dataInicial) > -1;
    }
}