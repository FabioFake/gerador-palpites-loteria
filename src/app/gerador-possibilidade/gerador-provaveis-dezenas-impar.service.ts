
import { Injectable } from '@angular/core';

import { GeradorProvaveisDezenas } from './gerador-provaveis-dezenas.service';
import { DecididorQualProbabilidadeService } from 'app/gerador-possibilidade/decididor-qual-probabilidade.service';

@Injectable()
export class GeradorProvaveisDezenasImparService extends GeradorProvaveisDezenas{

  private quantidadeDeImpares;
  private quantidadeDePares;

  public constructor(private decididorQualProbabilidade: DecididorQualProbabilidadeService){
    super();
    this.reset();
  }

  public carregarProvaveisDezenas(provaveisDezenas: number[]): number[] {

    /** 0 IMPAR E 1 PAR */
    const arrayQuantidades: Array<number> = [];

    const indicadorImparPar = 
      this.decididorQualProbabilidade.decidirProbabilidadeProvavel([this.quantidadeDeImpares, this.quantidadeDePares]);


    if(this.quantidadeDeImpares > 0 || this.quantidadeDePares > 0){
      // if(this.quantidadeDeImpares > this.quantidadeDePares ){
      if(indicadorImparPar === 0){
        provaveisDezenas = this.removerPares(provaveisDezenas);
      }else if(indicadorImparPar === 1){
        provaveisDezenas = this.removerImpares(provaveisDezenas);
      }
    }
    return provaveisDezenas;
  }

  public reset (): void{
    // console.log(`RESET -> QUANTIDADE DE IMPARES ${this.quantidadeDeImpares}, QUANTIDADE DE PARES ${this.quantidadeDePares}`);
    this.quantidadeDeImpares = 0;
    this.quantidadeDePares = 0;
    // console.log(`DEPOIS DO RESET -> QUANTIDADE DE IMPARES ${this.quantidadeDeImpares}, QUANTIDADE DE PARES ${this.quantidadeDePares}`);
  }


  // public decidirProbabilidadeProvavel(): number {

  //   const quantidadesImparesEPares: Array<number> = [];
  //   quantidadesImparesEPares.push(this.quantidadeDeImpares);
  //   quantidadesImparesEPares.push(this.quantidadeDePares);

 
  //   /** O ÍNDICE 0 SERÃO AS IMPARES E O 1 PARES */
  //   const quantidadesImparesEPares: Array<number> = [];
  //   quantidadesImparesEPares.push(this.quantidadeDeImpares);
  //   quantidadesImparesEPares.push(this.quantidadeDePares);

  //   const porcentagens: Array<number> = this.calcularPorcentagem(quantidadesImparesEPares);
  //   const porcentagensParaDecisao: Array<number> = this.criarArrayPorcentagensParaDecisao(porcentagens);

  //   const indiceSorteado =Math.floor( Math.random() * porcentagensParaDecisao.length);

  //   const porcentagemSorteada = porcentagensParaDecisao[indiceSorteado];
  //   for (let i: number  = 0; i < porcentagens.length ; i++){
  //     if(porcentagens[i] == porcentagemSorteada){
  //       return i;
  //     }
  //   }
  // }



  private removerPares(provaveisDezenas: Array<number>){
    let soImpares = provaveisDezenas.filter (dezena => {return dezena % 2 > 0});
    
    return soImpares;
  }

  private removerImpares(provaveisDezenas: Array<number> ){
    let soPares = provaveisDezenas.filter (dezena => {return dezena %2 ===0});
    
    return soPares;
  }

  public adicionarAsProbabilidades( dezena : number): void{
    if( dezena % 2 === 0 ){
      this.quantidadeDePares ++;
    }else{
      this.quantidadeDeImpares ++;
    }
    
  }


}
