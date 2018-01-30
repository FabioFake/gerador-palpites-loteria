import { Injectable } from '@angular/core';

import { GeradorProvaveisDezenas } from './gerador-provaveis-dezenas.service';
import { DecididorQualProbabilidadeService } from 'app/gerador-possibilidade/decididor-qual-probabilidade.service';

@Injectable()
export class IneditoGeradorProvaveisDezenasService extends GeradorProvaveisDezenas {

  private quantidadeInedito;
  private quantidadeRepetido;

  private dezenasJaSorteadas: Array<number> = [];

  constructor(private decididorQualProbabilidadeService: DecididorQualProbabilidadeService){
    super();
    this.reset();
  }

  public reset(){
    this.quantidadeInedito = 0;
    this.quantidadeRepetido = 0;
  }

  public carregarProvaveisDezenas(provaveisDezenas: Array<number>): Array<number> {
    
    /**INEDITO = 0 E REPETIDO = 1 */

    const indicadorIneditoRepetido: number = 
      this.decididorQualProbabilidadeService.decidirProbabilidadeProvavel([this.quantidadeRepetido, this.quantidadeRepetido]);

    if (this.quantidadeInedito > this.quantidadeRepetido) {
    // if( indicadorIneditoRepetido === 0){
      provaveisDezenas = this.retirarRepetidos(provaveisDezenas);
      
    } else if (this.quantidadeInedito < this.quantidadeRepetido) {
    // } else if (indicadorIneditoRepetido === 1){ 
      provaveisDezenas = this.retirarIneditos(provaveisDezenas);
      
    }
    
    return provaveisDezenas;
  }

  private retirarRepetidos(provaveisDezenas: Array<number>) {
    //DEIXAR APENAS OS INEDITOS

    provaveisDezenas = provaveisDezenas.filter(dezena => {
      let inedito: boolean = true;
      for (let i = 0; i < this.dezenasJaSorteadas.length; i++) {
        if (this.dezenasJaSorteadas[i] === dezena) {
          inedito = false;
          break;
        }
      }
      return inedito;
    });
    return provaveisDezenas;
  }

  public adicionarAsProbabilidades(dezena: number) {
    let ehRepetida: boolean = false;
    for (let i = 0; i < this.dezenasJaSorteadas.length; i++) {
      if(dezena === this.dezenasJaSorteadas[i]){
        ehRepetida = true;
        break;
      }
    }
    if(!ehRepetida){
      this.dezenasJaSorteadas.push(dezena);
      this.quantidadeInedito ++;
    }else{
      this.quantidadeRepetido ++;
    }

    
  }

  private retirarIneditos(provaveisDezenas: Array<number>) {
    //DEIXANDO APENAS OS REPETIDOS
    
    provaveisDezenas = provaveisDezenas.filter(dezena => {
      for (let i = 0; i < this.dezenasJaSorteadas.length; i++) {
        if (this.dezenasJaSorteadas[i] === dezena) {
          return true;
        }
      }
    });
    return provaveisDezenas;
  }

}
