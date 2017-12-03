import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LeitorResultadosService } from './gerador-resultado/leitor-resultados.service';
import { MontadorResultadoMegasenaService } from './gerador-resultado/montador-resultado/montador-resultado-megasena.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    LeitorResultadosService, 
    MontadorResultadoMegasenaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
