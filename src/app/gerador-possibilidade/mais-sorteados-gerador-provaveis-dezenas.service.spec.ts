import { TestBed, inject } from '@angular/core/testing';

import { MaisSorteadosGeradorProvaveisDezenasService } from './mais-sorteados-gerador-provaveis-dezenas.service';
// import { MaisSorteadaModel } from './mais-sorteada.model';

describe('MaisSorteadosGeradorProvaveisDezenasService', () => {


  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     providers: [MaisSorteadosGeradorProvaveisDezenasService]
  //   });
  // });

  // it('should be created',
  //   inject([MaisSorteadosGeradorProvaveisDezenasService], (service: MaisSorteadosGeradorProvaveisDezenasService) => {
  //     expect(service).toBeTruthy();
  //   }));

  // it('Deve contar certo o número de vezes que uma dezena é sorteada',
  //   inject([MaisSorteadosGeradorProvaveisDezenasService], (service: MaisSorteadosGeradorProvaveisDezenasService) => {
  //     let dezenas: Array<number> = [1, 2, 3, 4, 5, 3, 6, 5, 5, 3, 2, 3, 8, 5, 9, 3, 0, 1, 5, 3];
      
  //     dezenas.forEach(dezena => service.adicionarAsProbabilidades(dezena));

  //     const dezenaMaisSorteadaModel: MaisSorteadaModel =
  //       service.dezenasSortedas.find(dezenaMaisSorteada => dezenaMaisSorteada.dezena === 5);
  //     expect(5).toBe(dezenaMaisSorteadaModel.vezes);
  //   }));

  // it('DEVE ORDENAR PELO NUMERO DE VEZES QUE SAIU',
  //   inject([MaisSorteadosGeradorProvaveisDezenasService], (service: MaisSorteadosGeradorProvaveisDezenasService) => {
  //     let dezenas: Array<number> = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
      
  //     dezenas.forEach(dezena => service.adicionarAsProbabilidades(dezena));
  //     expect(service.dezenasMaisSorteadas[0]).toBe(4);
  //     expect(service.dezenasMaisSorteadas[1]).toBe(3);

  //   }))

  // it('Deve retornar uma lista com os mais sorteados',
  //   inject([MaisSorteadosGeradorProvaveisDezenasService], (service: MaisSorteadosGeradorProvaveisDezenasService) => {
  //     let dezenas: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //     dezenas.push(...dezenas);
  //     dezenas.push(...[22, 33, ...[2, 3, 4, 5, 6, 7, 8, 9, 10]]);
  //     dezenas.push(...[21, 31, ...[3, 4, 5, 6, 7, 8, 9, 10]]);
  //     dezenas.push(...[20, 30, ...[4, 5, 6, 7, 8, 9, 10]]);
  //     dezenas.push(...[40, 50, ...[5, 6, 7, 8, 9, 10]]);
  //     dezenas.push(...[23, 34, ...[6, 7, 8, 9, 10]]);
  //     dezenas.push(...[24, 35, ...[7, 8, 9, 10]]);
  //     dezenas.push(...[25, 36, ...[8, 9, 10]]);
  //     dezenas.push(...[26, 37, ...[9, 10]]);
  //     dezenas.push(...[27, 38, ...[10]]);

  //     dezenas.forEach(dezena => service.adicionarAsProbabilidades(dezena));

  //     expect(service.dezenasMaisSorteadas).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  //   }));

  // it('Deve definir a media do intervalo entre a aparição de uma dezena das mais sorteadas corretamente',
  //   inject([MaisSorteadosGeradorProvaveisDezenasService],
  //     (service: MaisSorteadosGeradorProvaveisDezenasService) => {
  //       let dezenas: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  //       dezenas.forEach((dezena) => {
  //         service.adicionarAsProbabilidades(dezena);
  //       });
  //       expect(service.mediaDeSaidaDezenasMaisSorteadas).toBe(0);

  //       service.adicionarAsProbabilidades(1);
  //       expect(service.mediaDeSaidaDezenasMaisSorteadas).toBe(10);

  //       service.adicionarAsProbabilidades(21);
  //       service.adicionarAsProbabilidades(22);
  //       service.adicionarAsProbabilidades(23);
  //       service.adicionarAsProbabilidades(24);
  //       service.adicionarAsProbabilidades(25);
  //       service.adicionarAsProbabilidades(26);
  //       service.adicionarAsProbabilidades(27);
  //       service.adicionarAsProbabilidades(28);
  //       service.adicionarAsProbabilidades(29);

  //       expect(service.mediaDeSaidaDezenasMaisSorteadas).toBe(19);

  //       service.adicionarAsProbabilidades(1);

  //       expect(service.mediaDeSaidaDezenasMaisSorteadas).toBe(10);

  //       service.adicionarAsProbabilidades(1);

  //       expect(service.mediaDeSaidaDezenasMaisSorteadas).toBe(7);

  //     }));

  // it('Deve retornar apenas as dezenas mais sorteadas', inject([MaisSorteadosGeradorProvaveisDezenasService],
  //   (service: MaisSorteadosGeradorProvaveisDezenasService) => {
  //     let dezenas: Array<number> = [1, 2];

  //     dezenas.forEach((dezena) => {
  //       service.adicionarAsProbabilidades(dezena);
  //     });
  //     expect(service.mediaDeSaidaDezenasMaisSorteadas).toBe(0);

  //     service.adicionarAsProbabilidades(1);
  //     expect(service.mediaDeSaidaDezenasMaisSorteadas).toBe(3);
  //     service.adicionarAsProbabilidades(1);
      
  //     service.adicionarAsProbabilidades(21);
  //     service.adicionarAsProbabilidades(22);
  //     service.adicionarAsProbabilidades(23);
  //     service.adicionarAsProbabilidades(24);
      
  //     expect(service.carregarProvaveisDezenas([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]))
  //       .toEqual([1, 2]);

  //   }));
})