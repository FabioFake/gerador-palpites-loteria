import { Component } from '@angular/core';

import { LeitorResultadosService } from './gerador-resultado/leitor-resultados.service';
import { TipoLoteriaEnum } from './utils/tipo-loteria.enum';
import { MontadorResultadoMegasenaService } from './gerador-resultado/montador-resultado/montador-resultado-megasena.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public tipoLoteria: number;

  private arquivoResultados: File;

  public constructor(private leitorResultadosService: LeitorResultadosService,
    private montadorResultadoMegasenaService: MontadorResultadoMegasenaService) {

  }

  public onInputFileChange(evt: any): void {
    this.arquivoResultados = evt.target.files[0];
    console.log(this.arquivoResultados.name);
  }

  public gerarJogo(evt: any) {
    console.log("GERAR JOGO !!!!", TipoLoteriaEnum.MEGASENA, this.tipoLoteria);

    //TODO Utilizar Map para definição da estratégia
    if (TipoLoteriaEnum.MEGASENA == this.tipoLoteria) {
      //TODO LIGAR AMPULHETA
      this.leitorResultadosService.carregarResultados(this.arquivoResultados, 
          this.montadorResultadoMegasenaService);
    }

  }
}
