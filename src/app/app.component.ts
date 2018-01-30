import { Component } from '@angular/core';

import { LeitorResultadosService } from './gerador-resultado/leitor-resultados.service';
import { TipoLoteriaEnum } from './utils/tipo-loteria.enum';
import { MontadorResultadoMegasenaService } from './gerador-resultado/montador-resultado/montador-resultado-megasena.service';
import { TesteGeradorProbabilidadesService } from './gerador-possibilidade/teste-gerador-probabilidades.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public tipoLoteria: number;

  private arquivoResultados: File;

  public constructor(private leitorResultadosService: LeitorResultadosService,
    private montadorResultadoMegasenaService: MontadorResultadoMegasenaService,
    private testeGeradorProbabilidadesService: TesteGeradorProbabilidadesService) {

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

  private tratarResponse (resultadoJogos){
    this.ordenarDezenas(resultadoJogos);
    this.testeGeradorProbabilidadesService.testarGeracaoPorPossibilidades(resultadoJogos);
  }

  

  private ordenarDezenas(resultadosJogos){
    resultadosJogos.forEach(resultadoJogo => {
      // 
      resultadoJogo.dezenas.sort(this.ordenarNumerico);
      // 
    });
  }

  private ordenarNumerico(a: number,b: number){
    if(a > b) return 1;
    if(a<b) return -1;
    if(a===b)return 0;
  }
}
