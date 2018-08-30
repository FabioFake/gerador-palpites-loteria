import { Injectable } from "@angular/core";

@Injectable()
export class DecididorQualProbabilidadeService {
  constructor() {}

  public decidirProbabilidadeProvavel(quantidades: Array<number>): number {

    const porcentagens: Array<number> = this.calcularPorcentagem(quantidades);
    const porcentagensParaDecisao: Array<number> = this.criarArrayPorcentagensParaDecisao(porcentagens);

    const indiceSorteado = Math.floor( Math.random() * porcentagensParaDecisao.length);

    const porcentagemSorteada = porcentagensParaDecisao[indiceSorteado];
    for (let i = 0; i < porcentagens.length; i++) {
      if (porcentagens[i] === porcentagemSorteada) {
        return i;
      }
    }

  }

  public criarArrayPorcentagensParaDecisao(
    porcentagens: Array<number>
  ): Array<number> {
    const porcentagensParaDecremento: Array<number> = [...porcentagens];
    const porcentagensParaDecisao: Array<number> = [];
    for (let i = 0; i < 100; i++) {
      let indicePorcentagem = this.acharIndiceProximaPorcentagemParaArrayDecisao(
        porcentagensParaDecremento
      );
      if (indicePorcentagem === -1) {
        break;
      } else {
        porcentagensParaDecisao.push(porcentagens[indicePorcentagem]);
      }
    }
    return porcentagensParaDecisao;
  }

  public calcularPorcentagem(quantidades: Array<number>): Array<number> {
    let total: number = 0;
    quantidades.map(quantidade => (total += quantidade));

    let porcentagens: Array<number> = [];
    quantidades.map(quantidade => {
      porcentagens.push(Math.ceil((100 * quantidade) / total));
    });
    return porcentagens;
  }

  private acharIndiceProximaPorcentagemParaArrayDecisao(
    porcentagemParaDecremento: Array<number>
  ): number {
    if (porcentagemParaDecremento.length === 0) {
      return -1;
    }
    let indiceSorteado: number = Math.floor(
      Math.random() * porcentagemParaDecremento.length
    );
    if (porcentagemParaDecremento[indiceSorteado] === 0) {
      porcentagemParaDecremento = porcentagemParaDecremento.filter(
        numero => numero > 0
      );
      indiceSorteado = this.acharIndiceProximaPorcentagemParaArrayDecisao(
        porcentagemParaDecremento
      );
    }
    if (indiceSorteado > -1) {
      porcentagemParaDecremento[indiceSorteado]--;
    }
    return indiceSorteado;
  }
}
