import { Injectable } from '@angular/core';

import { GeradorProvaveisDezenas } from 'app/gerador-possibilidade/gerador-provaveis-dezenas.service';
import { GeradorProvaveisDezenasImparService } from './gerador-provaveis-dezenas-impar.service';
import { IneditoGeradorProvaveisDezenasService } from './inedito-gerador-provaveis-dezenas.service';
import { MaisSorteadosGeradorProvaveisDezenasService } from './mais-sorteados-gerador-provaveis-dezenas.service';
import { RangeNumeracaoGeradorProvaveisDezenasService } from './range-numeracao-gerador-provaveis-dezenas.service';




@Injectable()
export class TesteGeradorProbabilidadesService {

  private apenasPrimeirasDezenas: Array<number> = [];
  private acerto: number = 0;
  private erro: number = 0;
  private jogoProvavel: Array<any>;
  private geradoresProbrabilidadeArray: Array<GeradorProvaveisDezenas>;

  private PROBABILIDADE_MINIMA: number = 7;

  constructor(
    private geradorProvaveisDezenasImparService: GeradorProvaveisDezenasImparService,
    private ineditoGeradorProvaveisDezenasService: IneditoGeradorProvaveisDezenasService,
    private rangeNumeracaoGeradorProvaveisDezenas: RangeNumeracaoGeradorProvaveisDezenasService,
    private maisSorteadosGeradorProvaveisDezenasService: MaisSorteadosGeradorProvaveisDezenasService) { }

  public testarGeracaoPorPossibilidades(resultadoJogos): void {
    this.jogoProvavel = [];

    const promises: Array<Promise<any>> = [];
    for (let i = 0; i < 6; i++) {

      /**
       * EXTRAI AS DEZENAS NA ORDEM.NO RESULTADO ORDENADO EXTRAI APENAS AS PRIMERIAS DEZENAS, 
       * APÓS AS SEGUNDAS E ASSIM POR DIANTE 
       * */
      this.extrairApenasDezenas(resultadoJogos, i);
      console.log(`COLUNA ${i} => `, this.apenasPrimeirasDezenas);
      this.comecarSorteiosECarregamentoProbabilidades(0);

      // this.acerto = 0;
      // this.erro = 0;
      // promises.push(this.executarSorteiosPorPromise(0));
      // this.resetarGeradoresProbabilidade()

    }
    Promise.all(promises).
      then(() => {
        console.log('JOGO SORTEADO = ', this.jogoProvavel)
      })
      .catch((erro) => { console.error(erro) });
    // console.log('JOGO SORTEADO = ', this.jogoProvavel);
  }

  private extrairApenasDezenas(resultadosJogos, indice): void {
    this.apenasPrimeirasDezenas = [];
    resultadosJogos.forEach(resultadoJogo => {
      this.apenasPrimeirasDezenas.push(resultadoJogo.dezenas[indice])
    });
  }

  private resetarGeradoresProbabilidade() {
    this.geradorProvaveisDezenasImparService.reset();
    this.ineditoGeradorProvaveisDezenasService.reset();
    this.rangeNumeracaoGeradorProvaveisDezenas.reset();
    this.maisSorteadosGeradorProvaveisDezenasService.reset();
  }

  private executarSorteiosPorPromise(indiceDezenas: number): Promise<any> {


      this.carregarProvaveisDezenasPorPromise()
        .then((dezenas) => {
          console.log('PROVAVEIS DEZENAS', dezenas);
        });


    // const provaveisDezenasPromise: Promise<any> = new Promise((resolve, reject) => {
    //   this.carregarProvaveisDezenasPorPromise()
    //     .then((dezenas) => {
    //       const provaveisDezenas = this.determinarInterseccao(dezenas);
    //       const numeroSorteado: number = this.sortear(provaveisDezenas);
    //       this.calcularErrosAcertos(numeroSorteado, this.apenasPrimeirasDezenas[indiceDezenas], indiceDezenas);

    //       const porcentagemErrosAcertos: number = this.calcularPorcentagemErrosAcertos(indiceDezenas);

    //       /**CASO O NÚMERO SORTEADO SEJA REPETIDO RETORNARÁ FALSO. NESSE CASO DEVE SER RESSORTEADO */
    //       if (!this.adicionarDezenaAoJogoProvavel(numeroSorteado, indiceDezenas)) {
    //         this.executarSorteiosPorPromise(indiceDezenas);
    //       }

    //       this.adicionarDezenaAsProbalidades(this.apenasPrimeirasDezenas[indiceDezenas]);
    //       indiceDezenas++;
    //       if (this.apenasPrimeirasDezenas[indiceDezenas]) {
    //         this.executarSorteiosPorPromise(indiceDezenas);
    //       } else {
    //         console.log("TERMINADA EXECUÇÃO DESTA PROMISE");
    //         resolve("TERMINADA EXECUÇÃO DESTA PROMISE");
    //       }

    //     });
    // });
    // return provaveisDezenasPromise;
    return Promise.resolve();
  }

  /**
   * Retoranrá false se o número for repetido
   * @param numeroSorteado 
   */
  private adicionarDezenaAoJogoProvavel(numeroSorteado: number, porcentagemErrosAcertos: number): boolean {
    const isRepetido: boolean = this.isRepetido(numeroSorteado, this.jogoProvavel);
    if (!isRepetido) {
      const dezenaEPorcentagem: any = new Object();
      dezenaEPorcentagem.dezena = numeroSorteado;
      dezenaEPorcentagem.porcentage = porcentagemErrosAcertos;
      this.jogoProvavel.push(dezenaEPorcentagem);
    }
    return isRepetido;
  }

  private calcularErrosAcertos(numeroSorteado: number, dezena: number, contador: number) {
    let log: string = (`${contador} - ${dezena} <=> ${numeroSorteado}`);
    if (dezena === numeroSorteado) {
      this.acerto++;
      log = log + ' => ACERTOU !!!';
    } else {
      log = log + ' => ERROU !';
      this.erro++;
    }
  }

  public determinarInterseccao(dezenas: Array<Array<number>>): Array<number> {
    console.log('DETERMINAR INTERSSECÇÃO', dezenas);
    // let primeiraDezena: Array<number> = dezenas[0];
    let dezenaIntersseccao: Array<number> = dezenas[0];
    for (let i = 1; i < dezenas.length; i++) {
      dezenaIntersseccao = dezenaIntersseccao.filter((d) => new Set(dezenas[i]).has(d));
    }
    console.log('DEZENAS DA INTERSSECÇÃO', dezenaIntersseccao);
    return dezenaIntersseccao;

  }

  private carregarProvaveisDezenasPorPromise(): Promise<any> {
    const _60Dezenas = this.carregarArrayCom60Dezenas();
    return Promise.all(
      [
        new Promise((resolve, reject) => {
          const dezenas: Array<number>  = this.geradorProvaveisDezenasImparService.carregarProvaveisDezenas(_60Dezenas);
          resolve(dezenas);
        }),

        new Promise((resolve, reject) => {
          const dezenas = this.ineditoGeradorProvaveisDezenasService.carregarProvaveisDezenas(_60Dezenas);
          resolve(dezenas);
        }),

        this.toPromise(this.rangeNumeracaoGeradorProvaveisDezenas.carregarProvaveisDezenas(_60Dezenas)),
        this.toPromise(this.maisSorteadosGeradorProvaveisDezenasService.carregarProvaveisDezenas(_60Dezenas))
      ]
    );

  }

  private toPromise(provaveisNumeros: any): Promise<any> {
    return Promise.resolve(provaveisNumeros);
  }




  /** @deprecated */
  private comecarSorteiosECarregamentoProbabilidades(controleAntiOverFlow: number) {
    // console.log("CONTROLE ANTI OVER FLOW", controleAntiOverFlow);
    this.acerto = 0;
    this.erro = 0;
    let ct = 0;
    let porcentagemErrosAcertos = 0;
    this.apenasPrimeirasDezenas.forEach(dezena => {
      ct++;
      const provaveisNumeros: Array<number> = this.carregarProvaveisDezenas();
      const numeroSorteado: number = this.sortear(provaveisNumeros);
      let log: string = (`${ct} - ${dezena} <=> ${numeroSorteado}`);
      if (dezena === numeroSorteado) {
        this.acerto++;
        log = log + ' => ACERTOU !!!';
      } else {
        log = log + ' => ERROU !';
        this.erro++;
      }

      porcentagemErrosAcertos = this.calcularPorcentagemErrosAcertos(ct);
      log = log + `// PORCENTAGEM DE ACERTOS ${porcentagemErrosAcertos}`

      this.adicionarDezenaAsProbalidades(dezena);
    });

    if (porcentagemErrosAcertos < this.PROBABILIDADE_MINIMA && controleAntiOverFlow < 200) {
      controleAntiOverFlow++;
      this.comecarSorteiosECarregamentoProbabilidades(controleAntiOverFlow);
    } else {

      const provaveisNumeros: Array<number> = this.carregarProvaveisDezenas();
      const numeroProximoJogo: number = this.sortear(provaveisNumeros);
      if (this.isRepetido(numeroProximoJogo, this.jogoProvavel)) {
        this.comecarSorteiosECarregamentoProbabilidades(0);
      } else {
        const dezenaEPorcentagem: any = new Object();
        dezenaEPorcentagem.dezena = numeroProximoJogo;
        dezenaEPorcentagem.porcentage = porcentagemErrosAcertos
        this.jogoProvavel.push(dezenaEPorcentagem);

      }
    }
  }

  private isRepetido(numero: number, jogo: Array<any>) {
    for (let dezenaEPorcentagem of jogo) {
      if (dezenaEPorcentagem.dezena === numero) {
        return true;
      }
    }
  }

  private adicionarDezenaAsProbalidades(dezena: number) {
    this.geradorProvaveisDezenasImparService.adicionarAsProbabilidades(dezena);
    this.ineditoGeradorProvaveisDezenasService.adicionarAsProbabilidades(dezena);
    this.rangeNumeracaoGeradorProvaveisDezenas.adicionarAsProbabilidades(dezena);
    this.maisSorteadosGeradorProvaveisDezenasService.adicionarAsProbabilidades(dezena);
  }

  private calcularPorcentagemErrosAcertos(quantidade): number {
    let porcentagem: number = 0;
    if (this.acerto > 0) {
      porcentagem = (100 * this.acerto) / quantidade;
    }
    return porcentagem;
  }

  private sortear(dezenas: Array<number>): number {
    const indice: number = Math.floor(Math.random() * dezenas.length);
    return dezenas[indice];
  }

  private carregarProvaveisDezenas(): Array<number> {
    let provaveisDezenas =
      this.geradorProvaveisDezenasImparService.carregarProvaveisDezenas(this.carregarArrayCom60Dezenas());
    provaveisDezenas = this.ineditoGeradorProvaveisDezenasService.carregarProvaveisDezenas(provaveisDezenas);
    provaveisDezenas = this.rangeNumeracaoGeradorProvaveisDezenas.carregarProvaveisDezenas(provaveisDezenas);
    provaveisDezenas = this.maisSorteadosGeradorProvaveisDezenasService.carregarProvaveisDezenas(provaveisDezenas);
    return provaveisDezenas;
  }

  private carregarArrayCom60Dezenas(): Array<number> {
    const dezenas: Array<number> = [];

    for (let i = 1; i < 61; i++) {
      dezenas.push(i);
    }

    return dezenas;
  }
}
