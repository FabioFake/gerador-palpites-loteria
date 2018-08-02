import { Injectable } from '@angular/core';

import { GeradorProvaveisDezenasImparService } from '../gerador-possibilidade/gerador-provaveis-dezenas-impar.service';
import { IneditoGeradorProvaveisDezenasService } from '../gerador-possibilidade/inedito-gerador-provaveis-dezenas.service';
import { GeradorProvaveisDezenas } from '../gerador-possibilidade/gerador-provaveis-dezenas.service';
import { RangeNumeracaoGeradorProvaveisDezenasService } from '../gerador-possibilidade/range-numeracao-gerador-provaveis-dezenas.service';
import { MaisSorteadosGeradorProvaveisDezenasService } from '../gerador-possibilidade/mais-sorteados-gerador-provaveis-dezenas.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GeradorDezenasMegaSenaService {

  private quantidadeSorteios = 0;
  private quantidadeErros = 0;
  private indiceResultadosMegaSena = -1;
  private provaveisDezenas: Array<number> = [];
  private asSessentaDezenas: Array<number>;
  private geradorProvaveisDezenasArray: Array<GeradorProvaveisDezenas>;
  private palpite: Array<number> = [];
  private porcentagemAcertosPosicaoDezena: Array<number> = [];
  public controladorOverflow = 0;

  private PORCENTAGEM_MINIMA_ACERTOS = 7;

  private melhorPercentagem = -1;
  private palpiteComMelhorPercentagem = -1;

  public $palpiteSubject: Subject<any> = new Subject<any>();

  constructor(private geradorProvaveisDezenasImparService: GeradorProvaveisDezenasImparService,
    private ineditoGeradorProvaveisDezenasService: IneditoGeradorProvaveisDezenasService,
    private rangeNumeracaoGeradorProvaveisDezenas: RangeNumeracaoGeradorProvaveisDezenasService,
    private maisSorteadosGeradorProvaveisDezenasService: MaisSorteadosGeradorProvaveisDezenasService
  ) {
    this.carregarAsSessentaDezenas();
    this.criarGeradorProbabilidadesArray();
  }

  private criarGeradorProbabilidadesArray() {
    this.geradorProvaveisDezenasArray = [];
    this.geradorProvaveisDezenasArray.push(this.geradorProvaveisDezenasImparService);
    this.geradorProvaveisDezenasArray.push(this.ineditoGeradorProvaveisDezenasService);
    this.geradorProvaveisDezenasArray.push(this.rangeNumeracaoGeradorProvaveisDezenas);
    // this.geradorProvaveisDezenasArray.push(this.maisSorteadosGeradorProvaveisDezenasService);
  }

  private carregarAsSessentaDezenas(): void {
    this.asSessentaDezenas = [];
    for (let i = 1; i < 61; i++) {
      this.asSessentaDezenas.push(i);
    }
  }

  // public gerarProvaveisJogoMegaSena(resultadosMegaSena: Array<Array<number>>): Promise<Array<number>> {
  //   return new Promise<Array<number>>((resolve, reject) => {

  //   });
  // }

  public gerarProbabilidades(resultadosMegaSena: Array<Array<number>>): Subject<any>   {
    this.gerarProbabilidadesPorPosicao(resultadosMegaSena, 0);
    return this.$palpiteSubject;
  }

  public gerarProbabilidadesPorPosicao(resultadosMegaSena: Array<Array<number>>, indicePosicao: number): void {

    let proximoResultadoMegaSena = this.pegarProximoResultado(resultadosMegaSena);

    if (proximoResultadoMegaSena) {
      let resultadoDezenaPosicao = this.pegarProximaDezenaPosicao(proximoResultadoMegaSena, indicePosicao);

      Promise.all(this.criarProbabilidadesPromisesArray())
        .then((resultadosProvaveis) => {

          // console.log('********* RESULTADOS PROVAVEIS ', resultadosProvaveis);
          let dezenasIntersecao: Array<number> = this.determinarIntersecao(resultadosProvaveis);
          // console.log('********* INTERSEÇÃO PARA SORTEIO ', dezenasIntersecao);

          let dezenaSorteada = this.sortearDezena(dezenasIntersecao);
          this.contabilizarErrosAcertos(resultadoDezenaPosicao, dezenaSorteada);
          this.adicionarDezenaAosGeradoresParaEstatistica(resultadoDezenaPosicao);
          this.gerarProbabilidadesPorPosicao(resultadosMegaSena, indicePosicao);

        })
    } else {
      // console.log('############################################### IR PARA PRÓXIMA ###########################')

      /** Se não há proximo Resultado é hora de sortear o Palpite da vez */
      Promise.all(this.criarProbabilidadesPromisesArray())
        .then((resultadosProvaveis) => {
          let dezenasIntersecao: Array<number> = this.determinarIntersecao(resultadosProvaveis);
          /** Retira da intersecao as dezenas ja sorteadas */
          dezenasIntersecao = dezenasIntersecao.filter((dInter) => {
            return !this.palpite.find(p => p === dInter);
          });
          // console.log('DEZENAS INTERSECAO DEPOIS DE RETIRAR AS PALPITADAS', dezenasIntersecao);

          if (!dezenasIntersecao || dezenasIntersecao.length === 0) {
            resultadosProvaveis.pop();
            dezenasIntersecao = this.determinarIntersecao(resultadosProvaveis);

            dezenasIntersecao = dezenasIntersecao.filter((dInter) => {
              return !this.palpite.find(p => p === dInter);
            });
            // console.log('DEZENAS INTERSECAO DEPOIS DE RETIRAR AS PALPITADAS POP 01', dezenasIntersecao);
          }


          if (!dezenasIntersecao || dezenasIntersecao.length === 0) {
            resultadosProvaveis.pop();
            dezenasIntersecao = this.determinarIntersecao(resultadosProvaveis);

            dezenasIntersecao = dezenasIntersecao.filter((dInter) => {
              return !this.palpite.find(p => p === dInter);
            });
            // console.log('DEZENAS INTERSECAO DEPOIS DE RETIRAR AS PALPITADAS POP 02', dezenasIntersecao);
          }

          let dezenaPalpite = this.sortearDezena(dezenasIntersecao);
          let isJaExisteNoPalpite = this.palpite.find(p => p === dezenaPalpite);
          // if (isJaExisteNoPalpite) {
            // console.log('***********************************************************************')
            // console.log('***********************************************************************')
            // console.log('***********************************************************************')
            // console.log('***********************************************************************')
            // console.log('isJaExisteNoPalpite', isJaExisteNoPalpite, dezenaPalpite);
            // console.log('***********************************************************************')
            // console.log('***********************************************************************')
          // }
          // while(this.palpite.find(p => p === dezenaPalpite)){
          //   dezenaPalpite = this.sortearDezena(dezenasIntersecao);
          // }

          /** Cálculo de acertos para a dezena   */
          const totalSorteiosPosicaoAteOMomento = this.indiceResultadosMegaSena - 1;
          const quantidadeAcertos = totalSorteiosPosicaoAteOMomento - this.quantidadeErros;
          const porcentagemAtual = (quantidadeAcertos * 100) / totalSorteiosPosicaoAteOMomento;
          // this.porcentagemAcertosPosicaoDezena[indicePosicao] = (quantidadeAcertos * 100) / totalSorteiosPosicaoAteOMomento;
          if(this.controladorOverflow % 100 === 0){
            console.log('--------------- PALPITE ', this.palpite);
            console.log('--------------- POCENTAGEM ACERTOS PARA A POSIÇÃO ', this.porcentagemAcertosPosicaoDezena);
            console.log('--------------- CONTROLADOR DE OVERFLOW', this.controladorOverflow);
            console.log('--------------- MELHOR PORCENTAGEM', this.melhorPercentagem);
            console.log('--------------- PALPITE COM MELHOR PORCENTAGEM', this.palpiteComMelhorPercentagem);
          }

          if(this.melhorPercentagem < porcentagemAtual){
            this.melhorPercentagem = porcentagemAtual;
            this.palpiteComMelhorPercentagem = dezenaPalpite;
            this.porcentagemAcertosPosicaoDezena[indicePosicao] = this.melhorPercentagem;
          }

          if (
            // (this.porcentagemAcertosPosicaoDezena[indicePosicao] > this.PORCENTAGEM_MINIMA_ACERTOS)
            // ||
            this.controladorOverflow > 750
          ){
            this.resetarControladorOverflow();
            this.resetarGeradorProvaveisDezenasArray();
            this.$palpiteSubject.next(JSON.parse('{ "dezena" : ' + this.palpiteComMelhorPercentagem + ' , "porcentagem" : ' + this.melhorPercentagem + ' } '));
            indicePosicao++;
            console.log('---------------- PALPITE PARA A POSIÇÃO. (POSICAO, PALPITE) ', indicePosicao, this.palpiteComMelhorPercentagem);
            this.palpite.push(this.palpiteComMelhorPercentagem);
            this.melhorPercentagem = -1;
            this.palpiteComMelhorPercentagem = -1;
          }

          this.incrementarControladorOverflow();
          // console.log('--------------- CONTROLADOR DE OVERFLOW DEPOIS DO INCREMENTO', this.controladorOverflow);
          if (indicePosicao < 6) {
            // this.resetarControladorOverflow();
            this.indiceResultadosMegaSena = 0;
            this.quantidadeErros = 0;
            this.gerarProbabilidadesPorPosicao(resultadosMegaSena, indicePosicao);
          }
        });

    }

    // return this.resutadoPromise;
  }

  private resetarGeradorProvaveisDezenasArray(){
    this.geradorProvaveisDezenasArray.forEach((gerador) => gerador.reset());
  }

  private adicionarDezenaAosGeradoresParaEstatistica(dezenaResultadoMegaSena: number) {
    this.geradorProvaveisDezenasArray.forEach((gerador) => {
      gerador.adicionarAsProbabilidades(dezenaResultadoMegaSena);
    });
  }

  public criarProbabilidadesPromisesArray(): Array<Promise<any>> {
    const promisesArray: Array<Promise<any>> = [];
    this.geradorProvaveisDezenasArray.forEach((gerador) => {
      promisesArray.push(this.criarGeradorProvaveisDezenasPromise(gerador));
    });
    return promisesArray;
  }

  private criarGeradorProvaveisDezenasPromise(gerador: GeradorProvaveisDezenas): Promise<any> {
    return new Promise((resolve, reject) => {
      const provaveisDezenas = gerador.carregarProvaveisDezenas(this.asSessentaDezenas);
      resolve(provaveisDezenas);
    });
  }

  // private getGeradorProvaveisDezenasImparPromise(): Promise<Array<number>> {
  //   return new Promise((resolve, reject) => {
  //     const provaveisImparOuPar =
  //       this.geradorProvaveisDezenasImparService.carregarProvaveisDezenas(this.asSessentaDezenas);
  //     resolve(provaveisImparOuPar);
  //   });
  // }

  // private getIneditoGeradorProvaveisDezenasService(): Promise<Array<number>> {
  //   return new Promise((resolve, reject) => {
  //     resolve(this.ineditoGeradorProvaveisDezenasService.carregarProvaveisDezenas(this.asSessentaDezenas));
  //   })
  // }

  public pegarProximoResultado(resultadoMegaSena: Array<Array<number>>): Array<number> {
    this.indiceResultadosMegaSena++;
    return resultadoMegaSena[this.indiceResultadosMegaSena];
  }

  public pegarProximaDezenaPosicao(resultadoMegaSena: Array<number>, indiceNumber): number {
    return resultadoMegaSena[indiceNumber];
  }

  private gerarProvavelDezena(): number {
    return null;

  }

  public determinarIntersecao(dezenasCandidatas: Array<Array<number>>): Array<number> {

    dezenasCandidatas = this.ordenarPorTamanhoDoArrayDecrescente(dezenasCandidatas);
    const historicoIntersecoes: Array<Array<number>> = [];

    let intersecao: Array<number> = dezenasCandidatas.reduce((array_inicial, array_atual) => {

      let interseccaoTmp = [...array_inicial];

      const filtrado = array_inicial.filter((valor) => array_atual.includes(valor));

      /** Só atribui o array filtrado se tiver alguma coisa dentro */
      if (filtrado.length > 0) {
        interseccaoTmp = filtrado;
      }
      /** Armazena um histórico das tentativas de interseção */
      historicoIntersecoes.push(interseccaoTmp);

      return interseccaoTmp;
    });

    /**
     * Se a interseção de todos os Arrays ficar vazia percorre de trás pra frente o
     * histórico de interseções até achar um array com alguma coisa dentro.
     */
    while ((!intersecao || intersecao.length == 0) && historicoIntersecoes.length > 0) {
      intersecao = historicoIntersecoes.pop();
    }

    return intersecao;

  }

  public ordenarPorTamanhoDoArrayDecrescente(dezenasCandidatas: Array<Array<number>>): Array<Array<number>> {
    return dezenasCandidatas.sort((array_01, array_02) => {
      let diferenca = 0; // Mesmo Tamanho
      if (array_02.length > array_01.length) {
        diferenca = 1;
      } else if (array_02.length < array_01.length) {
        diferenca = -1;
      }
      return diferenca;
    });

  }

  private sortearDezena(provaveisDezenas: Array<number>): number {

    const indice: number = Math.floor(Math.random() * provaveisDezenas.length);
    // console.log('SORTEAR - (INDICE, LENGTH, DEZENAS) ', indice, provaveisDezenas.length, provaveisDezenas);
    // console.log('SORTEAR - VALOR ', provaveisDezenas[indice]);
    return provaveisDezenas[indice];

  }

  private contabilizarErrosAcertos(dezenaMegaSena: number, dezenaPalpite: number): void {
    if (dezenaMegaSena !== dezenaPalpite) {
      this.quantidadeErros++;
    }
    // console.log(dezenaMegaSena, dezenaPalpite, '*** ERROS ', this.quantidadeErros, ' INDICE JOGOS', this.indiceResultadosMegaSena);
  }

  private armazenarDezenaSorteada(dezena: number): void { }

  private reset() { }

  public incrementarControladorOverflow() {
    this.controladorOverflow++;
  }


  public resetarControladorOverflow() {
    this.controladorOverflow = 0;
  }


}
