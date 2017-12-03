import { Injectable } from '@angular/core';

import { MontadorResultadoInterface} from './montador-resultado.interface';

@Injectable()
export class MontadorResultadoMegasenaService implements MontadorResultadoInterface{


    constructor() { }

    adicionarResultado(textoResuldao: string): void {
        console.log(' ADICIONAR RESULTADO');
    }
}