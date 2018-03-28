import { Injectable } from '@angular/core';

import { GeradorProvaveisDezenas } from './gerador-provaveis-dezenas.service'
import { MaisSorteadaModel } from './mais-sorteada.model';
import { debug } from 'util';

@Injectable()
export class MaisSorteadosGeradorProvaveisDezenasService extends GeradorProvaveisDezenas {

  public dezenasMaisSorteadas: Array<number>;
  public dezenasSortedas: Array<MaisSorteadaModel> = [];
  public mediaDeSaidaDezenasMaisSorteadas: number;
  public haQuantosSorteiosNaosSaiUmaMaisSorteada: number = 0;
  public intervalosEntreSorteioDeMaisSorteadas: Array<number> = [];

  public static QUANTIDADE_DEZENAS_MAIS_SORTEADAS = 10;

  constructor() {
    super();
    this.reset();
    this.intervalosEntreSorteioDeMaisSorteadas = [0];
  }

  public carregarProvaveisDezenas(provaveisDezenas: number[]): number[] {
    let ultimoIndice = this.intervalosEntreSorteioDeMaisSorteadas.length - 1;
    let intervaloAtual: number = this.intervalosEntreSorteioDeMaisSorteadas[ultimoIndice];

    if (intervaloAtual >= this.mediaDeSaidaDezenasMaisSorteadas) {
      const dezenasArray = this.separarApenasMaisSorteadas(provaveisDezenas);
      return dezenasArray;
    }
    return provaveisDezenas;
  }

  protected separarApenasMaisSorteadas(provaveisDezenas: number[]) {
    const apenasMaisSorteadas = provaveisDezenas.filter((dezena) => {
      const maisSorteadaEncontrada = this.dezenasMaisSorteadas.find( dezenaMaisSorteada => dezenaMaisSorteada === dezena); 
      
      return dezena === maisSorteadaEncontrada;
    });
    
    return apenasMaisSorteadas;
  }

  public adicionarAsProbabilidades(dezena: number): void {

    this.adicionarDezenaSorteada(dezena);
    this.calcularMediaDeSaidaDezenasMaisSorteadas(dezena);
    this.calcularMaisSorteadas();
  }

  private calcularMediaDeSaidaDezenasMaisSorteadas(dezena: number) {

    let ultimoIndice = this.intervalosEntreSorteioDeMaisSorteadas.length - 1;
    this.intervalosEntreSorteioDeMaisSorteadas[ultimoIndice]++;
    let totalIntervalos = 0;
    this.intervalosEntreSorteioDeMaisSorteadas.forEach((intervalo) => {
      totalIntervalos += intervalo;
    });

    const dezenaDasMaisSorteada: number =
      this.dezenasMaisSorteadas.find((dezenaMaisSorteada) => dezenaMaisSorteada === dezena);
    if (dezenaDasMaisSorteada) {
      this.intervalosEntreSorteioDeMaisSorteadas.push(0);
      ultimoIndice = this.intervalosEntreSorteioDeMaisSorteadas.length - 1;
    }

    this.mediaDeSaidaDezenasMaisSorteadas = ultimoIndice > 0 ? totalIntervalos / ultimoIndice : 0;
    

  }

  private calcularMaisSorteadas() {
    let dezenasOrdenadas: Array<MaisSorteadaModel> = [...this.dezenasSortedas];
    dezenasOrdenadas.sort((d1, d2) => this.ordenarMaisSorteadas(d1, d2));
    let tamanhoColecao = dezenasOrdenadas.length
      > MaisSorteadosGeradorProvaveisDezenasService.QUANTIDADE_DEZENAS_MAIS_SORTEADAS ?
      MaisSorteadosGeradorProvaveisDezenasService.QUANTIDADE_DEZENAS_MAIS_SORTEADAS :
      dezenasOrdenadas.length;

    this.dezenasMaisSorteadas = [];
    for (let i = 0; i < tamanhoColecao; i++) {
      this.dezenasMaisSorteadas.push(dezenasOrdenadas[i].dezena);
    }

  }

  private ordenarMaisSorteadas(d1: MaisSorteadaModel, d2: MaisSorteadaModel) {
    let res = 0;

    if (d1.vezes < d2.vezes) {
      res = 1;
    } else if (d1.vezes > d2.vezes) {

      res = -1
    }
    return res;
  }

  private adicionarDezenaSorteada(dezena: number) {
    let dezenaSorteada: MaisSorteadaModel =
      this.dezenasSortedas.find(dezenaS => dezenaS.dezena === dezena);

    if (!dezenaSorteada) {
      dezenaSorteada = new MaisSorteadaModel();
      dezenaSorteada.dezena = dezena;
      dezenaSorteada.vezes = 1;
      this.dezenasSortedas.push(dezenaSorteada);
    } else {
      dezenaSorteada.vezes++;
    }
  }

  public reset(): void {
    this.dezenasMaisSorteadas = [];
    this.dezenasSortedas = [];
    this.intervalosEntreSorteioDeMaisSorteadas = [0];
  }


}
