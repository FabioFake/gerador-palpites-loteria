import { Component } from '@angular/core';

import { GeradorDezenasMegaSenaService } from './mega-sena/gerador-dezenas-mega-sena.service';
import { LeitorResultadosService } from './gerador-resultado/leitor-resultados.service';
import { TipoLoteriaEnum } from './utils/tipo-loteria.enum';
import { MontadorResultadoMegasenaService } from './gerador-resultado/montador-resultado/montador-resultado-megasena.service';
import { TesteGeradorProbabilidadesService } from './gerador-possibilidade/teste-gerador-probabilidades.service';
import { ResultadoJogo } from './gerador-resultado/beans/resultado-jogo';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public tipoLoteria: number;

  private arquivoResultados: File;

  public palpiteArray:Array<number> = [];
  public porcentagemArray: Array<number> = [];

  public constructor(private leitorResultadosService: LeitorResultadosService,
    private montadorResultadoMegasenaService: MontadorResultadoMegasenaService,
    private testeGeradorProbabilidadesService: TesteGeradorProbabilidadesService,
    private geradorDezenasMegaSenaService: GeradorDezenasMegaSenaService) {

  }

  public onInputFileChange(evt: any): void {
    this.arquivoResultados = evt.target.files[0];
  }

  public gerarJogo(evt: any) {


    //TODO Utilizar Map para definição da estratégia
    if (TipoLoteriaEnum.MEGASENA == this.tipoLoteria) {
      //TODO LIGAR AMPULHETA
      this.leitorResultadosService.carregarResultados(this.arquivoResultados,
        this.montadorResultadoMegasenaService)
        .then((response) => {
          this.tratarResponse(response.resultadosJogos);
        });
    }
  }

  private tratarResponse(resultadoJogos) {
    this.ordenarDezenas(resultadoJogos);
    const apenasDezenasNumericas = this.extrairApenasDezenas(resultadoJogos);
    const geradorPalpitesSubscription: Subscription =
      this.geradorDezenasMegaSenaService.gerarProbabilidades(apenasDezenasNumericas).subscribe((palpite) => {
        console.log('*******************************************');
        console.log('*******************************************');
        console.log('*******************************************');
        console.log(palpite);
        this.palpiteArray.push(palpite.dezena);
        this.porcentagemArray.push(palpite.porcentagem);
      });
    // this.testeGeradorProbabilidadesService.testarGeracaoPorPossibilidades(resultadoJogos);
  }

  private extrairApenasDezenas(resultadoJogos: Array<ResultadoJogo>): Array<Array<number>> {
    const apenasDezenasArray: Array<Array<number>> = [];
    resultadoJogos.forEach((resultado) => {
      apenasDezenasArray.push([...resultado.dezenas]);
    })
    return apenasDezenasArray;
  }


  private ordenarDezenas(resultadosJogos) {
    resultadosJogos.forEach(resultadoJogo => {
      //
      resultadoJogo.dezenas.sort(this.ordenarNumerico);
      //
    });
  }

  private ordenarNumerico(a: number, b: number) {
    if (a > b) return 1;
    if (a < b) return -1;
    if (a === b) return 0;
  }
}
