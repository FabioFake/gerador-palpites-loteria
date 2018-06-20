import { TestBed, inject } from '@angular/core/testing';

import { DecididorQualProbabilidadeService } from '../gerador-possibilidade/decididor-qual-probabilidade.service';
import { GeradorDezenasMegaSenaService } from './gerador-dezenas-mega-sena.service';
import { GeradorProvaveisDezenasImparService } from '../gerador-possibilidade/gerador-provaveis-dezenas-impar.service';
import { IneditoGeradorProvaveisDezenasService } from '../gerador-possibilidade/inedito-gerador-provaveis-dezenas.service';
import { MaisSorteadosGeradorProvaveisDezenasService } from '../gerador-possibilidade/mais-sorteados-gerador-provaveis-dezenas.service';
import { RangeNumeracaoGeradorProvaveisDezenasService } from '../gerador-possibilidade/range-numeracao-gerador-provaveis-dezenas.service';



fdescribe('GeradorDezenasMegaSenaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DecididorQualProbabilidadeService,
        GeradorDezenasMegaSenaService,
        GeradorProvaveisDezenasImparService,
        IneditoGeradorProvaveisDezenasService,
        MaisSorteadosGeradorProvaveisDezenasService,
        RangeNumeracaoGeradorProvaveisDezenasService
      ]
    });
  });

  it('should be created', inject([GeradorDezenasMegaSenaService], (service: GeradorDezenasMegaSenaService) => {
    expect(service).toBeTruthy();
  }));

  fit('Deve gerar palpite', inject([GeradorDezenasMegaSenaService], (service: GeradorDezenasMegaSenaService) => {
    // const lista_01 =[1, 2, 3];
    // const lista_02 = [4,5,6];
    // const lista_03 = [7,8,9];
    // console.log([lista_01, lista_02, lista_03].reduce((a,b) => {
    //   console.log(a, b);
    //   return [4];
    // }));
    service.gerarProbabilidades([
      // [1, 22, 44, 55, 56, 77],
      // [3,35,36,37,52,55], 
      // [5,23,37,42,49,51],
      // [1, 22, 44, 55, 56, 77],
      // [6,35,36,37,52,55], 
      // [7,23,37,42,49,51],
      // [8, 22, 44, 55, 56, 77],
      // [9,35,36,37,52,55], 
      // [10,23,37,42,49,51],
      // [11,35,36,37,52,55], 
      // [12,23,37,42,49,51],
      // [13, 22, 44, 55, 56, 77],
      // [14,35,36,37,52,55], 
      // [15,23,37,42,49,51],
      // [16,35,36,37,52,55], 
      // [17,23,37,42,49,51],
      // [18, 22, 44, 55, 56, 77],
      // [19,35,36,37,52,55], 
      [20, 23, 37, 42, 49, 51],
      [21, 35, 36, 37, 52, 55],
      [22, 23, 37, 42, 49, 51],
      [23, 22, 44, 55, 56, 77],
      [24, 35, 36, 37, 52, 55],
      [5, 23, 37, 42, 49, 51],
      [3, 35, 36, 37, 52, 55],
      [5, 23, 37, 42, 49, 51],
      [1, 22, 44, 55, 56, 77],
      [3, 35, 36, 37, 52, 55],
      [5, 23, 37, 42, 49, 51]
    ]);
  }));

  it('Deve ordenar pelo tamanho do Array de Forma Decrescente',
    inject([GeradorDezenasMegaSenaService], (service: GeradorDezenasMegaSenaService) => {
      const array_01 = [1];
      const array_02 = [1, 2, 3];
      const array_03 = [1, 2];

      const ordenada = service.ordenarPorTamanhoDoArrayDecrescente([array_01, array_02, array_03]);
      expect(ordenada).toEqual([array_02, array_03, array_01]);
      console.log('Arrays ordenados decresentemente pelo tamanho do Array', ordenada);
    }));

  it('Deve determinar a interseção entre os Arrays',
    inject([GeradorDezenasMegaSenaService], (service: GeradorDezenasMegaSenaService) => {
      const array_01 = [1, 2, 3];
      const array_02 = [1, 4, 5, 3];
      const array_03 = [1, 4, 5, 2, 3];
      const interseccao = service.determinarIntersecao([array_01, array_02, array_03]);

      expect(interseccao).toEqual([1, 3]);
    }));

  it('Deve retornar alguma array caso não haja intersseção entre todos os Arrays ',
    inject([GeradorDezenasMegaSenaService], (service: GeradorDezenasMegaSenaService) => {
      const array_01 = [1, 2, 3];
      const array_02 = [1, 4, 5, 6];
      const array_03 = [10, 11, 12];

      const interseccao = service.determinarIntersecao([array_01, array_02, array_03]);
      expect(interseccao).toEqual([1]);
    }));

  it('Deve retornar o maior Array caso não de interseção entre nenhum Array',
    inject([GeradorDezenasMegaSenaService], (service: GeradorDezenasMegaSenaService) => {
      const array_01 = [1, 2, 3];
      const array_02 = [4, 5, 6, 7, 8];
      const array_03 = [10, 11, 12];

      const interseccao = service.determinarIntersecao([array_01, array_02, array_03]);
      expect(interseccao).toEqual(array_02);
    }));

  it('#incrementarControladorOverflow -> Deve não permitir que ocorra não overflow',
    inject([GeradorDezenasMegaSenaService], (service:
      GeradorDezenasMegaSenaService)=> {
        while (true && service.controladorOverflow < 10) {
         service.incrementarControladorOverflow();
        }
        expect(service.controladorOverflow).toEqual(10);
    }));

  it('#resetarControladorOverflow -> Deve zerar o controlado de overflow',
      inject([GeradorDezenasMegaSenaService], (service)=>{
        for (let i = 0; i < 3; i++){
          service.incrementarControladorOverflow();
        }
        expect(service.controladorOverflow).toEqual(3);
        service.resetarControladorOverflow();
        expect(service.controladorOverflow).toEqual(0);
  }));



});
