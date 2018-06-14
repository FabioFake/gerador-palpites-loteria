import { TestBed, inject } from '@angular/core/testing';

import { TesteGeradorProbabilidadesService } from './teste-gerador-probabilidades.service';
import { GeradorProvaveisDezenasImparService } from 'app/gerador-possibilidade/gerador-provaveis-dezenas-impar.service';
import { IneditoGeradorProvaveisDezenasService } from 'app/gerador-possibilidade/inedito-gerador-provaveis-dezenas.service';
import { DecididorQualProbabilidadeService } from 'app/gerador-possibilidade/decididor-qual-probabilidade.service';
import { MaisSorteadosGeradorProvaveisDezenasService } from './mais-sorteados-gerador-provaveis-dezenas.service';
import { RangeNumeracaoGeradorProvaveisDezenasService } from 'app/gerador-possibilidade/range-numeracao-gerador-provaveis-dezenas.service';


describe('TesteGeradorProbabilidadesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DecididorQualProbabilidadeService,
        GeradorProvaveisDezenasImparService,
        IneditoGeradorProvaveisDezenasService,
        MaisSorteadosGeradorProvaveisDezenasService,
        RangeNumeracaoGeradorProvaveisDezenasService,
        TesteGeradorProbabilidadesService]
    });
  });

  it('should be created', inject([TesteGeradorProbabilidadesService], (service: TesteGeradorProbabilidadesService) => {
    expect(service).toBeTruthy();
  }));

  it('Deve determinar a interssecção', inject ([TesteGeradorProbabilidadesService], (service: TesteGeradorProbabilidadesService) => {
    const a = [0, 1, 2, 3];
    const b = [1, 3];
    const c = [3];
    let ret = service.determinarInterseccao([a , b, c]);
    expect(ret).toEqual([3]);
  }));
});
