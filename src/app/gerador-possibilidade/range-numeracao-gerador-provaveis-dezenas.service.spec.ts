import { TestBed, inject } from '@angular/core/testing';

import { RangeNumeracaoGeradorProvaveisDezenasService } from './range-numeracao-gerador-provaveis-dezenas.service';

describe('RangeNumeracaoGeradorProvaveisDezenasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RangeNumeracaoGeradorProvaveisDezenasService]
    });
  });

  it('should be created', inject([RangeNumeracaoGeradorProvaveisDezenasService], 
    (service: RangeNumeracaoGeradorProvaveisDezenasService) => {
    expect(service).toBeTruthy();
  }));

  it('DEVE RETORNAR ENTRE 0 E 10', inject ([RangeNumeracaoGeradorProvaveisDezenasService],
  (service: RangeNumeracaoGeradorProvaveisDezenasService) => {
    service.adicionarAsProbabilidades ( 5);
    const dezenas = [1,5,7,10,15,25];
    const resposta = service.carregarProvaveisDezenas(dezenas);
    expect([1,5,7,10]).toEqual(resposta);
  }));

  it('DEVE RETORNAR ENTRE 10 E 20', inject ([RangeNumeracaoGeradorProvaveisDezenasService],
    (service: RangeNumeracaoGeradorProvaveisDezenasService) => {
      service.adicionarAsProbabilidades ( 13);
      const dezenas = [7,15,25];
      const resposta = service.carregarProvaveisDezenas(dezenas);
      expect([15]).toEqual(resposta);
  }));

  it('DEVE RETORNAR ENTRE 20 E 30', inject ([RangeNumeracaoGeradorProvaveisDezenasService],
    (service: RangeNumeracaoGeradorProvaveisDezenasService) => {
      service.adicionarAsProbabilidades (23);
      const dezenas = [7,15,25];
      const resposta = service.carregarProvaveisDezenas(dezenas);
      expect([25]).toEqual(resposta);
  }));
});
