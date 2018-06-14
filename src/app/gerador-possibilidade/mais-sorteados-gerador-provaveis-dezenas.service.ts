import { Injectable } from '@angular/core';

import { GeradorProvaveisDezenas } from './gerador-provaveis-dezenas.service'
import { DezenaComContadorModel } from './dezena-com-contador.model';
import { debug } from 'util';
import { DecididorQualProbabilidadeService } from './decididor-qual-probabilidade.service';

@Injectable()
export class MaisSorteadosGeradorProvaveisDezenasService extends GeradorProvaveisDezenas {

  /**
   * Todas as dezenas serão armazenadas e a quantidade de vezes 
   * que ela foi sorteada será incrementada.
   * As dezenas mais sorteadas será um recorte desta lista ordenada. 
   * */
  public dezenasSorteadasArray: Array<DezenaComContadorModel>;
  private contadorSorteios;
  private QUANTIDADE_MAIS_SORTEADAS = 3;

  constructor(private decididorQualProbabilidade: DecididorQualProbabilidadeService) {
    super();
    this.reset();
    // this.intervalosEntreSorteioDeMaisSorteadas = [0];
  }

  public reset() {
    this.dezenasSorteadasArray = [];
    this.contadorSorteios = 0;
  }

  public carregarProvaveisDezenas(provaveisDezenas: number[]): number[] {

    // if(this.contadorSorteios > this.CONTROLADOR_INICIO){
    const dezenasMaisSorteadasComContador: Array<DezenaComContadorModel> = this.extrairMaisSorteadas();
    const quantidadeDeMaisSorteadas = this.calcularQuantidaDeMaisSorteadas(dezenasMaisSorteadasComContador);
    const quantidadeDeMenosSorteadas = this.contadorSorteios - quantidadeDeMaisSorteadas;

    if (quantidadeDeMaisSorteadas > 0 && quantidadeDeMenosSorteadas > 0) {
      const indicadosMaisOuMenosSorteadas =
        this.decididorQualProbabilidade.decidirProbabilidadeProvavel([quantidadeDeMaisSorteadas, quantidadeDeMenosSorteadas]);
      const dezenasMaisSorteadas: Array<number> = this.extrairDezenas(dezenasMaisSorteadasComContador);
      if (indicadosMaisOuMenosSorteadas == 0) {
        provaveisDezenas = dezenasMaisSorteadas;
      } else if (indicadosMaisOuMenosSorteadas == 1) {
        provaveisDezenas = this.filtrarApenasMenosSorteadas(provaveisDezenas, dezenasMaisSorteadas);
      }

    }

    // }

    // let ultimoIndice = this.intervalosEntreSorteioDeMaisSorteadas.length - 1;
    // let intervaloAtual: number = this.intervalosEntreSorteioDeMaisSorteadas[ultimoIndice];

    // if (intervaloAtual >= this.mediaDeSaidaDezenasMaisSorteadas) {
    //   const dezenasArray = this.separarApenasMaisSorteadas(provaveisDezenas);
    //   return dezenasArray;
    // }
    return provaveisDezenas;
  }

  public extrairMaisSorteadas(): Array<DezenaComContadorModel> {
    const sorteadasOrdenadas: Array<DezenaComContadorModel> = this.ordenarSorteadas();
    if (sorteadasOrdenadas.length >= this.QUANTIDADE_MAIS_SORTEADAS) {
      sorteadasOrdenadas.splice(this.QUANTIDADE_MAIS_SORTEADAS, sorteadasOrdenadas.length - this.QUANTIDADE_MAIS_SORTEADAS);
    }
    return sorteadasOrdenadas;
  }

  public ordenarSorteadas() {
    return this.dezenasSorteadasArray.sort((d1, d2) => this.ordenarMaisSorteadas(d1, d2));
  }

  private ordenarMaisSorteadas(d1: DezenaComContadorModel, d2: DezenaComContadorModel) {
    let res = 0;
    if (d1.vezes < d2.vezes) {
      res = 1;
    } else if (d1.vezes > d2.vezes) {
      res = -1
    }
    return res;
  }

  public filtrarApenasMenosSorteadas(dezenas: Array<number>, maisSorteadas: Array<number>) {
    return dezenas.filter(dezena => !maisSorteadas.find(dezenaMaisSorteada => dezena === dezenaMaisSorteada));

  }

  public extrairDezenas(maisSortedasModelArray: Array<DezenaComContadorModel>): Array<number> {
    const dezenasArray: Array<number> = [];
    maisSortedasModelArray.forEach(maisSorteadaModel => dezenasArray.push(maisSorteadaModel.dezena));
    return dezenasArray;
  }

  private calcularQuantidaDeMaisSorteadas(dezenasMaisSorteadasComContador: Array<DezenaComContadorModel>): number {
    let quantidadeDeMaisSorteadas = 0;
    dezenasMaisSorteadasComContador.forEach((dezena) => {
      quantidadeDeMaisSorteadas += dezena.vezes;
    });
    return quantidadeDeMaisSorteadas;
  }

  public adicionarAsProbabilidades(dezena: number): void {

    this.adicionarDezenaSorteada(dezena);
    // this.calcularMediaDeSaidaDezenasMaisSorteadas(dezena);
    // this.calcularMaisSorteadas();
  }

  private adicionarDezenaSorteada(dezena: number) {
    this.contadorSorteios ++;
    let dezenaSorteada: DezenaComContadorModel =
      this.dezenasSorteadasArray.find(dezenaS => dezenaS.dezena === dezena);

    if (!dezenaSorteada) {
      dezenaSorteada = new DezenaComContadorModel();
      dezenaSorteada.dezena = dezena;
      dezenaSorteada.vezes = 1;
      this.dezenasSorteadasArray.push(dezenaSorteada);
    } else {
      dezenaSorteada.vezes++;
    }
  }


  //TODO Verificar a necessidade desse Array
  // public dezenasMaisSorteadas: Array<number>;

  // public dezenasMaisSorteadasModelArray: Array<MaisSorteadaModel> = [];
  // public dezenasSortedas: Array<MaisSorteadaModel> = [];
  // public mediaDeSaidaDezenasMaisSorteadas: number;
  // public haQuantosSorteiosNaosSaiUmaMaisSorteada: number = 0;
  // public intervalosEntreSorteioDeMaisSorteadas: Array<number> = [];

  // public static QUANTIDADE_DEZENAS_MAIS_SORTEADAS = 10;

  // // È NECESSÁRIO TER PELO MENOS 20 DEZENAS NAS DEZENAS SORTEADAS
  // private  CONTROLADOR_INICIO: number = 0;

  // constructor(private decididorQualProbabilidade: DecididorQualProbabilidadeService) {
  //   super();
  //   this.reset();
  //   this.intervalosEntreSorteioDeMaisSorteadas = [0];
  // }

  // public carregarProvaveisDezenas(provaveisDezenas: number[]): number[] {
  //   console.log('QUANTIDADE DE DEZENAS SORTEDAS', this.dezenasSortedas.length);
  //   if(this.dezenasSortedas.length > this.CONTROLADOR_INICIO){
  //     const quantidadeDeMaisSorteadas = this.calcularQuantidaDeMaisSorteadas();
  //     const quantidadeDeMenosSorteadas = this.dezenasSortedas.length - quantidadeDeMaisSorteadas;

  //     if (quantidadeDeMaisSorteadas > 0 && quantidadeDeMenosSorteadas > 0) {
  //       const indicadosMaisOuMenosSorteadas =
  //         this.decididorQualProbabilidade.decidirProbabilidadeProvavel([quantidadeDeMaisSorteadas, quantidadeDeMenosSorteadas]);

  //       if (indicadosMaisOuMenosSorteadas == 0) {
  //         provaveisDezenas = this.dezenasMaisSorteadas;
  //       } else if( indicadosMaisOuMenosSorteadas == 1 ) {
  //         provaveisDezenas = this.filtrarApenasMenosSorteadas(provaveisDezenas);
  //       }

  //     }
  //   }
  //   // let ultimoIndice = this.intervalosEntreSorteioDeMaisSorteadas.length - 1;
  //   // let intervaloAtual: number = this.intervalosEntreSorteioDeMaisSorteadas[ultimoIndice];

  //   // if (intervaloAtual >= this.mediaDeSaidaDezenasMaisSorteadas) {
  //   //   const dezenasArray = this.separarApenasMaisSorteadas(provaveisDezenas);
  //   //   return dezenasArray;
  //   // }
  //   return provaveisDezenas;
  // }

  // public filtrarApenasMenosSorteadas(provaveisDezenas: Array<number>): Array<number> {
  //   const dezenasMenosSorteadas = this.provaveisDezenas.filter((dezena) => {
  //     let possui = false;
  //     for (let i = 0; i < this.dezenasMaisSorteadasModelArray.length; i++) {
  //       possui = (dezena === this.dezenasMaisSorteadasModelArray[i].dezena);
  //       if (possui) {
  //         break
  //       }
  //     }
  //     return !possui;
  //   });
  //   return dezenasMenosSorteadas;
  // }




  // protected separarApenasMaisSorteadas(provaveisDezenas: number[]) {
  //   const apenasMaisSorteadas = provaveisDezenas.filter((dezena) => {
  //     const maisSorteadaEncontrada = this.dezenasMaisSorteadas.find(dezenaMaisSorteada => dezenaMaisSorteada === dezena);

  //     return dezena === maisSorteadaEncontrada;
  //   });

  //   return apenasMaisSorteadas;
  // }

  // public adicionarAsProbabilidades(dezena: number): void {

  //   this.adicionarDezenaSorteada(dezena);
  //   this.calcularMediaDeSaidaDezenasMaisSorteadas(dezena);
  //   this.calcularMaisSorteadas();
  // }

  // private calcularMediaDeSaidaDezenasMaisSorteadas(dezena: number) {

  //   let ultimoIndice = this.intervalosEntreSorteioDeMaisSorteadas.length - 1;
  //   this.intervalosEntreSorteioDeMaisSorteadas[ultimoIndice]++;
  //   let totalIntervalos = 0;
  //   this.intervalosEntreSorteioDeMaisSorteadas.forEach((intervalo) => {
  //     totalIntervalos += intervalo;
  //   });

  //   const dezenaDasMaisSorteada: number =
  //     this.dezenasMaisSorteadas.find((dezenaMaisSorteada) => dezenaMaisSorteada === dezena);
  //   if (dezenaDasMaisSorteada) {
  //     this.intervalosEntreSorteioDeMaisSorteadas.push(0);
  //     ultimoIndice = this.intervalosEntreSorteioDeMaisSorteadas.length - 1;
  //   }

  //   this.mediaDeSaidaDezenasMaisSorteadas = ultimoIndice > 0 ? totalIntervalos / ultimoIndice : 0;


  // }

  // private calcularMaisSorteadas() {
  //   let dezenasOrdenadas: Array<MaisSorteadaModel> = [...this.dezenasSortedas];
  //   dezenasOrdenadas.sort((d1, d2) => this.ordenarMaisSorteadas(d1, d2));
  //   let tamanhoColecao = dezenasOrdenadas.length
  //     > MaisSorteadosGeradorProvaveisDezenasService.QUANTIDADE_DEZENAS_MAIS_SORTEADAS ?
  //     MaisSorteadosGeradorProvaveisDezenasService.QUANTIDADE_DEZENAS_MAIS_SORTEADAS :
  //     dezenasOrdenadas.length;

  //   this.dezenasMaisSorteadas = [];
  //   for (let i = 0; i < tamanhoColecao; i++) {
  //     //TODO Verificar a necessidade de manter esse Array
  //     this.dezenasMaisSorteadas.push(dezenasOrdenadas[i].dezena);
  //     this.dezenasMaisSorteadasModelArray.push(dezenasOrdenadas[i]);
  //   }

  // }

  // private ordenarMaisSorteadas(d1: MaisSorteadaModel, d2: MaisSorteadaModel) {
  //   let res = 0;

  //   if (d1.vezes < d2.vezes) {
  //     res = 1;
  //   } else if (d1.vezes > d2.vezes) {

  //     res = -1
  //   }
  //   return res;
  // }

  // private adicionarDezenaSorteada(dezena: number) {
  //   let dezenaSorteada: MaisSorteadaModel =
  //     this.dezenasSortedas.find(dezenaS => dezenaS.dezena === dezena);

  //   if (!dezenaSorteada) {
  //     dezenaSorteada = new MaisSorteadaModel();
  //     dezenaSorteada.dezena = dezena;
  //     dezenaSorteada.vezes = 1;
  //     this.dezenasSortedas.push(dezenaSorteada);
  //   } else {
  //     dezenaSorteada.vezes++;
  //   }
  // }

  // public reset(): void {
  //   this.dezenasMaisSorteadas = [];
  //   this.dezenasSortedas = [];
  //   this.intervalosEntreSorteioDeMaisSorteadas = [0];
  //   this.dezenasMaisSorteadasModelArray = [];
  // }


}
