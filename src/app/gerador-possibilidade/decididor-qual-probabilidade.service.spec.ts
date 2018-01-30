import { TestBed, inject } from '@angular/core/testing';

import { DecididorQualProbabilidadeService } from './decididor-qual-probabilidade.service';

describe('DecididorQualProbabilidadeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecididorQualProbabilidadeService]
    });
  });

  it('should be created', inject([DecididorQualProbabilidadeService], (service: DecididorQualProbabilidadeService) => {
    expect(service).toBeTruthy();

  }));

  it('Deve calcular as porcentagens corretamente', inject([DecididorQualProbabilidadeService],
    (service: DecididorQualProbabilidadeService)=>{
      let quantidades: Array<number> = [10,90];
      let porcentagens = service.calcularPorcentagem(quantidades);

      
      expect([10,90]).toEqual(porcentagens);

    }));

    it('Deve distribuir as porcentagens em um array para decisao', inject([DecididorQualProbabilidadeService],
      (service: DecididorQualProbabilidadeService )=>{ 
        let porcentagens = [70,30];
        let distribuicaoPorcentagens: Array<number> = service.criarArrayPorcentagensParaDecisao(porcentagens);
  
        expect (distribuicaoPorcentagens.length).toEqual(100);
  
        
  
        distribuicaoPorcentagens = distribuicaoPorcentagens.filter(porcentagem => porcentagem === 30 );
  
        expect (distribuicaoPorcentagens.length).toEqual(30);
      }));
});
