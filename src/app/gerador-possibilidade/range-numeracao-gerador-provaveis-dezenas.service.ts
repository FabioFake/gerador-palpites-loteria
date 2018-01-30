import { Injectable } from '@angular/core';

import { GeradorProvaveisDezenas } from './gerador-provaveis-dezenas.service';
import { DecididorQualProbabilidadeService } from 'app/gerador-possibilidade/decididor-qual-probabilidade.service';

@Injectable()
export class RangeNumeracaoGeradorProvaveisDezenasService extends GeradorProvaveisDezenas {

  private quantidadeEntre0110: number;
  private quantidadeEntre1020: number;
  private quantidadeEntre2030: number;
  private quantidadeEntre3040: number;
  private quantidadeEntre4050: number;
  private quantidadeEntre5060: number;

  constructor(private decididorQualProbabilidade: DecididorQualProbabilidadeService) {
    super();
  }

  public reset(): void {
    this.quantidadeEntre0110 = 0;
    this.quantidadeEntre1020 = 0;
    this.quantidadeEntre2030 = 0;
  }

  public carregarProvaveisDezenas(provaveisDezenas: Array<number>): Array<number> {


    let dezenasProvaveis: Array<number> = provaveisDezenas;

    const indiceProbabilidade: number = this.decididorQualProbabilidade.decidirProbabilidadeProvavel(
      [this.quantidadeEntre0110,
      this.quantidadeEntre1020,
      this.quantidadeEntre2030,
      this.quantidadeEntre3040,
      this.quantidadeEntre4050,
      this.quantidadeEntre5060]);

    // if (this.quantidadeEntre0110 > this.quantidadeEntre1020 && 
    //     this.quantidadeEntre0110 > this.quantidadeEntre2030){
    if (indiceProbabilidade === 0) {
      dezenasProvaveis = this.deixarApenasEntre0110(provaveisDezenas);
      // }else if (this.quantidadeEntre1020 > this.quantidadeEntre0110 && 
      //     this.quantidadeEntre1020 > this.quantidadeEntre2030){
    } else if (indiceProbabilidade === 1) {
      dezenasProvaveis = this.deixarApenasEntre1020(provaveisDezenas);
      // }else if (this.quantidadeEntre2030 > this.quantidadeEntre0110 &&
      //     this.quantidadeEntre2030 > this.quantidadeEntre1020){
    } else if (indiceProbabilidade === 2) {
      dezenasProvaveis = this.deixarApenasEntre2030(provaveisDezenas);
    }

    switch (indiceProbabilidade) {
      case 0:
        dezenasProvaveis = this.deixarApenasEntre0110(provaveisDezenas);
        break;
      case 1:
        dezenasProvaveis = this.deixarApenasEntre1020(provaveisDezenas);
        break;
      case 2:
        dezenasProvaveis = this.deixarApenasEntre2030(provaveisDezenas);
        break;
      case 3:
        dezenasProvaveis = this.deixarApenasEntre3040(provaveisDezenas);
        break;
      case 4:
        dezenasProvaveis = this.deixarApenasEntre3040(provaveisDezenas);
        break;
      case 5:
        dezenasProvaveis = this.deixarApenasEntre4050(provaveisDezenas);
        break;
      case 6:
        dezenasProvaveis = this.deixarApenasEntre5060(provaveisDezenas);
        break;
    }


    return dezenasProvaveis;
  }

  private deixarApenasEntre0110(dezenas: Array<number>) {

    return this.filtrarPorRange(dezenas, 0, 11);
  }

  private deixarApenasEntre1020(dezenas: Array<number>) {

    return this.filtrarPorRange(dezenas, 10, 21);
  }

  private deixarApenasEntre2030(dezenas: Array<number>) {

    return this.filtrarPorRange(dezenas, 20, 31);
  }

  private deixarApenasEntre3040(dezenas: Array<number>) {

    return this.filtrarPorRange(dezenas, 30, 41);
  }

  private deixarApenasEntre4050(dezenas: Array<number>) {

    return this.filtrarPorRange(dezenas, 40, 51);
  }

  private deixarApenasEntre5060(dezenas: Array<number>) {

    return this.filtrarPorRange(dezenas, 50, 61);
  }

  private filtrarPorRange(dezenas: Array<number>, inicio: number, fim: number) {
    return dezenas.filter(dezena => dezena > inicio && dezena < fim);
  }

  public adicionarAsProbabilidades(dezena: number): void {
    if (dezena > 0 && dezena < 11) {
      this.quantidadeEntre0110++;
    } else if (dezena > 10 && dezena < 21) {
      this.quantidadeEntre1020++;
    } else if (dezena > 20 && dezena < 31) {
      this.quantidadeEntre2030++;
    } else if (dezena > 30 && dezena < 41) {
      this.quantidadeEntre3040++;
    } else if (dezena > 40 && dezena < 51) {
      this.quantidadeEntre4050++;
    }else if(dezena > 50 && dezena < 61){
      this.quantidadeEntre5060 ++;
    }
  }

}
