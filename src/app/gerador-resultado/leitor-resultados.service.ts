import { Injectable } from '@angular/core';

import { MontadorResultadoInterface } from './montador-resultado/montador-resultado.interface';
// import { MontadorResultadoMegasenaService } from './montador-resultado/montador-resultado-megasena.service';

@Injectable()
export class LeitorResultadosService {

    public montadorResultado: MontadorResultadoInterface;

    constructor() { }

    public carregarResultados(arquivo: File, montadorResultado: MontadorResultadoInterface):Promise<any>{
        this.montadorResultado = montadorResultado;
        return this.lerArquivo(arquivo);
    }

    protected lerArquivo(arquivo: File): Promise<any>{


        let reader = new FileReader();

        let promise = new Promise(
            (resolve, reject ) =>{
                reader.onload = (e: any) => {

                    let content = e.target.result;

                    this.extrairJogos(content);
                    resolve(this.montadorResultado);
                }
            }
        )


        reader.readAsText(arquivo);

        return promise;

    }

    public extrairJogos(conteudoArquivo: string) {

        let linhas = conteudoArquivo.split("\n");
        console.log("[ LeitorResultadosService ].extrairJogos -> Linhas", linhas);
        linhas.forEach((linha) => {
            this.montadorResultado.adicionarResultado(linha);
            // console.log("[ LeitorResultadosService ].extrairJogos ->",
            //   (<MontadorResultadoMegasenaService> this.montadorResultado).resultadosJogos.length);
        });


    }




}
