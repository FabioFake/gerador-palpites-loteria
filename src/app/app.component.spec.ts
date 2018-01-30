import { FormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { DecididorQualProbabilidadeService } from './gerador-possibilidade/decididor-qual-probabilidade.service';
import { LeitorResultadosService } from 'app/gerador-resultado/leitor-resultados.service';
import { MontadorResultadoMegasenaService } from 'app/gerador-resultado/montador-resultado/montador-resultado-megasena.service';
import { TesteGeradorProbabilidadesService } from 'app/gerador-possibilidade/teste-gerador-probabilidades.service';
import { GeradorProvaveisDezenasImparService } from 'app/gerador-possibilidade/gerador-provaveis-dezenas-impar.service';
import { IneditoGeradorProvaveisDezenasService } from 'app/gerador-possibilidade/inedito-gerador-provaveis-dezenas.service';
import { RangeNumeracaoGeradorProvaveisDezenasService } from 'app/gerador-possibilidade/range-numeracao-gerador-provaveis-dezenas.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        AppComponent
      ],
      providers:[
        DecididorQualProbabilidadeService,
        GeradorProvaveisDezenasImparService,
        IneditoGeradorProvaveisDezenasService,
        LeitorResultadosService,
        MontadorResultadoMegasenaService,
        RangeNumeracaoGeradorProvaveisDezenasService,
        TesteGeradorProbabilidadesService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'app works!'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
