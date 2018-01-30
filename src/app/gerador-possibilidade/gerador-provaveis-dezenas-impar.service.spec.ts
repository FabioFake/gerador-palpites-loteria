import { FormsModule } from '@angular/forms';
import { TestBed, inject } from '@angular/core/testing';

import { GeradorProvaveisDezenasImparService } from './gerador-provaveis-dezenas-impar.service';
import { DecididorQualProbabilidadeService } from 'app/gerador-possibilidade/decididor-qual-probabilidade.service';

describe('GeradorProvaveisDezenasImparService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [FormsModule],
      providers: [GeradorProvaveisDezenasImparService,
        DecididorQualProbabilidadeService]
    });
  });

  it('should be created', inject([GeradorProvaveisDezenasImparService], (service: GeradorProvaveisDezenasImparService) => {
    expect(service).toBeTruthy();
  }));

 
    
    it('Deve retornar apenas pares', inject([GeradorProvaveisDezenasImparService],      
      (service, GeradorProvaveisDezenasImparService) =>{
        service.adicionarAsProbabilidades(2);
        let dezenas = [1,2,3,4,5,6,7,8,9,10];
        let dezenasProvaveis = service.carregarProvaveisDezenas(dezenas);
        expect([2,4,6,8,10]).toEqual(dezenasProvaveis);
      }
    ));    

    it('DEVE RETORNAR APENAS IMPARES', inject ([GeradorProvaveisDezenasImparService], 
      (service, GeradorProvaveisDezenasImparService) => {
        service.adicionarAsProbabilidades(5);
        let dezenas = [1,2,3,4,5,6,7,8,9,10];
        let dezenasProvaveis = service.carregarProvaveisDezenas(dezenas);
        expect([1,3,5,7,9]).toEqual(dezenasProvaveis);
      }));
});
