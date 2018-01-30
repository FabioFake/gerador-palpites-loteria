import { TestBed, inject } from '@angular/core/testing';

import { DecididorQualProbabilidadeService } from './decididor-qual-probabilidade.service';
import { IneditoGeradorProvaveisDezenasService } from './inedito-gerador-provaveis-dezenas.service';
import { GeradorProvaveisDezenasImparService } from 'app/gerador-possibilidade/gerador-provaveis-dezenas-impar.service';

describe('IneditoGeradorProvaveisDezenasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DecididorQualProbabilidadeService,
        IneditoGeradorProvaveisDezenasService,
        GeradorProvaveisDezenasImparService]
    });
  });

  it('should be created', inject([IneditoGeradorProvaveisDezenasService], (service: IneditoGeradorProvaveisDezenasService) => {
    expect(service).toBeTruthy();
  }));

  it('Deveria ser apenas o INÉDITOS', inject([IneditoGeradorProvaveisDezenasService], (service: IneditoGeradorProvaveisDezenasService) => {
    const dezenas: Array<number> = [1,2,3,4,5];
    service.adicionarAsProbabilidades(4);
    service.adicionarAsProbabilidades(5);
    const resposta: Array<number> = service.carregarProvaveisDezenas(dezenas);
    
    expect(resposta).toEqual([1,2,3]);
  }));

  it('Deveria ser apenas os REPETIDOS', inject([IneditoGeradorProvaveisDezenasService], (service: IneditoGeradorProvaveisDezenasService) => {
    const dezenas: Array<number> = [1,2,3,4,5];
    service.adicionarAsProbabilidades(4);
    service.adicionarAsProbabilidades(4);
    service.adicionarAsProbabilidades(4);
    const resposta: Array<number> = service.carregarProvaveisDezenas(dezenas);
    
    expect([4]).toEqual(resposta);

  }));
});
