import { TestBed, inject } from '@angular/core/testing';

import { TesteGeradorProbabilidadesService } from './teste-gerador-probabilidades.service';
import { GeradorProvaveisDezenasImparService } from 'app/gerador-possibilidade/gerador-provaveis-dezenas-impar.service';
import { IneditoGeradorProvaveisDezenasService } from 'app/gerador-possibilidade/inedito-gerador-provaveis-dezenas.service';
import { DecididorQualProbabilidadeService } from 'app/gerador-possibilidade/decididor-qual-probabilidade.service';
import { RangeNumeracaoGeradorProvaveisDezenasService } from 'app/gerador-possibilidade/range-numeracao-gerador-provaveis-dezenas.service';

describe('TesteGeradorProbabilidadesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DecididorQualProbabilidadeService,
        GeradorProvaveisDezenasImparService,
        IneditoGeradorProvaveisDezenasService,
        RangeNumeracaoGeradorProvaveisDezenasService,
        TesteGeradorProbabilidadesService]
    });
  });

  it('should be created', inject([TesteGeradorProbabilidadesService], (service: TesteGeradorProbabilidadesService) => {
    expect(service).toBeTruthy();
  }));
});
