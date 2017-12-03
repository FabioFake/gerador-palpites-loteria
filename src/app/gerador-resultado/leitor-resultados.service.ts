import { Injectable } from '@angular/core';

import { MontadorResultadoInterface } from './montador-resultado/montador-resultado.interface';

@Injectable()
export class LeitorResultadosService {

    private montadorResultado: MontadorResultadoInterface;

    constructor() { }

    public carregarResultados(arquivo: File, montadorResultado: MontadorResultadoInterface):void{
        this.montadorResultado = montadorResultado;
        this.lerArquivo(arquivo);
    }

    protected lerArquivo(arquivo: File){
        console.log('LER AQUIVO = ', arquivo);
    }



}