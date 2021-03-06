import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DecididorQualProbabilidadeService } from './gerador-possibilidade/decididor-qual-probabilidade.service';
import { GeradorProvaveisDezenasImparService } from './gerador-possibilidade/gerador-provaveis-dezenas-impar.service';
import { GeradorDezenasMegaSenaService } from './mega-sena/gerador-dezenas-mega-sena.service';
import { IneditoGeradorProvaveisDezenasService } from './gerador-possibilidade/inedito-gerador-provaveis-dezenas.service';
import { LeitorResultadosService } from './gerador-resultado/leitor-resultados.service';
import { MaisSorteadosGeradorProvaveisDezenasService } from './gerador-possibilidade/mais-sorteados-gerador-provaveis-dezenas.service';
import { MontadorResultadoMegasenaService } from './gerador-resultado/montador-resultado/montador-resultado-megasena.service';
import { RangeNumeracaoGeradorProvaveisDezenasService } from './gerador-possibilidade/range-numeracao-gerador-provaveis-dezenas.service';
import { SpinnerModule } from './componentes/spinner/spinner.module';
import { TesteGeradorProbabilidadesService } from './gerador-possibilidade/teste-gerador-probabilidades.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SpinnerModule
  ],
  providers: [
    DecididorQualProbabilidadeService,
    IneditoGeradorProvaveisDezenasService,
    GeradorProvaveisDezenasImparService,
    GeradorDezenasMegaSenaService,
    LeitorResultadosService,
    MaisSorteadosGeradorProvaveisDezenasService,
    MontadorResultadoMegasenaService,
    RangeNumeracaoGeradorProvaveisDezenasService,
    TesteGeradorProbabilidadesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
