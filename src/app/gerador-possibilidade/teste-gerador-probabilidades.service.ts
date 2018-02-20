import { Injectable } from '@angular/core';

import { GeradorProvaveisDezenasImparService } from './gerador-provaveis-dezenas-impar.service';
import { IneditoGeradorProvaveisDezenasService } from './inedito-gerador-provaveis-dezenas.service';
import { RangeNumeracaoGeradorProvaveisDezenasService } from './range-numeracao-gerador-provaveis-dezenas.service';
import { GeradorProvaveisDezenas } from 'app/gerador-possibilidade/gerador-provaveis-dezenas.service';

@Injectable()
export class TesteGeradorProbabilidadesService {

  private apenasPrimeirasDezenas: Array<number> = [];
  private acerto: number = 0;
  private erro: number = 0;
  private jogoProvavel: Array<any>;
  private geradoresProbrabilidadeArray: Array<GeradorProvaveisDezenas>;

  constructor(
    private geradorProvaveisDezenasImparService: GeradorProvaveisDezenasImparService,
    private ineditoGeradorProvaveisDezenasService: IneditoGeradorProvaveisDezenasService,
    private rangeNumeracaoGeradorProvaveisDezenas: RangeNumeracaoGeradorProvaveisDezenasService) { }

  public testarGeracaoPorPossibilidades(resultadoJogos): void {
    this.jogoProvavel = [];
    for (let i = 0; i < 6; i++) {

      this.extrairApenasDezenas(resultadoJogos, i);
      console.log(`COLUNA ${i} => `, this.apenasPrimeirasDezenas);
      this.comecarSorteiosECarregamentoProbabilidades(0);
      this.resetarGeradoresProbabilidade()

    }
    console.log('JOGO SORTEADO = ', this.jogoProvavel);
  }

  private extrairApenasDezenas(resultadosJogos, indice): void {
    this.apenasPrimeirasDezenas = [];
    resultadosJogos.forEach(resultadoJogo => {
      this.apenasPrimeirasDezenas.push(resultadoJogo.dezenas[indice])
    });
  }

  private resetarGeradoresProbabilidade(){
    this.geradorProvaveisDezenasImparService.reset();
    this.ineditoGeradorProvaveisDezenasService.reset();
    this.rangeNumeracaoGeradorProvaveisDezenas.reset();
  }

  private comecarSorteiosECarregamentoProbabilidades(controleAntiOverFlow: number) {
    this.acerto = 0;
    this.erro = 0;
    let ct = 0;
    let porcentagemErrosAcertos = 0;
    this.apenasPrimeirasDezenas.forEach(dezena => {
      ct++;
      const provaveisNumeros: Array<number> = this.carregarProvaveisNumeros();
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

    if (porcentagemErrosAcertos < 6 || controleAntiOverFlow < 10) {
      controleAntiOverFlow++;
      this.comecarSorteiosECarregamentoProbabilidades(controleAntiOverFlow);
    } else {

      const provaveisNumeros: Array<number> = this.carregarProvaveisNumeros();
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

  private carregarProvaveisNumeros(): Array<number> {
    let provaveisDezenas =
      this.geradorProvaveisDezenasImparService.carregarProvaveisDezenas(this.carregarArrayCom60Dezenas());
    provaveisDezenas = this.ineditoGeradorProvaveisDezenasService.carregarProvaveisDezenas(provaveisDezenas);
    provaveisDezenas = this.rangeNumeracaoGeradorProvaveisDezenas.carregarProvaveisDezenas(provaveisDezenas);

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
