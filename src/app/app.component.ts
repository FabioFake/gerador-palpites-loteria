import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from "@angular/core";
import { Http } from "@angular/http";

import { GeradorDezenasMegaSenaService } from "./mega-sena/gerador-dezenas-mega-sena.service";
import { LeitorResultadosService } from "./gerador-resultado/leitor-resultados.service";
import { TipoLoteriaEnum } from "./utils/tipo-loteria.enum";
import { MontadorResultadoMegasenaService } from "./gerador-resultado/montador-resultado/montador-resultado-megasena.service";
import { TesteGeradorProbabilidadesService } from "./gerador-possibilidade/teste-gerador-probabilidades.service";
import { ResultadoJogo } from "./gerador-resultado/beans/resultado-jogo";
import { Subscription } from "rxjs/Subscription";
import { UrlResolver } from "@angular/compiler";
import { SpinnerService } from "./componentes/spinner/spinner.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  public tipoLoteria: number;

  private arquivoResultados: File;

  private conteudoArquivoResultado: string;

  public palpiteArray: Array<string> = [];
  public porcentagemArray: Array<number> = [];

  public mensagemErro: any;

  private geradorPalpitesSubscription: Subscription;

  public constructor(
    private leitorResultadosService: LeitorResultadosService,
    private montadorResultadoMegasenaService: MontadorResultadoMegasenaService,
    private testeGeradorProbabilidadesService: TesteGeradorProbabilidadesService,
    private geradorDezenasMegaSenaService: GeradorDezenasMegaSenaService,
    public spinnerService: SpinnerService,
    private http: Http
  ) {}

  public ngOnInit() {
    this.spinnerService.mostrarSpinner = true;
    this.http.get("assets/D_MEGA.HTM").subscribe(data => {
      // console.log("[APP Component] ngOnInit -> data.text", data.text());
      this.mensagemErro = "iniciando leitura arquivo";
      this.conteudoArquivoResultado = data.text().toString();
      this.mensagemErro = "ARQUIVO CARREGADO";
      console.log("[App Component].ngOnInit - ARQUIVO CARREGADO");
      this.spinnerService.mostrarSpinner = false;
    });

    this.geradorPalpitesSubscription = this.geradorDezenasMegaSenaService.$palpiteSubject.subscribe(
      palpite => {
        console.log("*******************************************");
        console.log("*******************************************");
        console.log("*******************************************");
        console.log(palpite);
        let palpiteString: string = "0";
        if (palpite.dezena < 10) {
          palpiteString += palpite.dezena;
        } else {
          palpiteString = palpite.dezena;
        }
        this.palpiteArray.push(palpiteString);
        this.porcentagemArray.push(palpite.porcentagem);
        if (this.palpiteArray.length === 6) {
          this.desligarSpinner();
        }
      }
    );
  }

  ngOnDestroy() {
    this.geradorPalpitesSubscription.unsubscribe();
  }

  public onInputFileChange(evt: any): void {
    this.arquivoResultados = evt.target.files[0];
  }

  // public gerarPalpites(){
  //   this.ligarSpinner();
  // this.changeDetector.markForCheck();
  // this.gerarPorPromise()
  //   .then((numero) => {
  //     this.palpite_01 = numero;
  //     this.spinnerService.mostrarSpinner = false;
  //   });

  // }

  // public gerarPorPromise(): Promise<number>{
  //   return new Promise<number>((resolve, reject) => {
  //     for(let i = 0; i < 10000000; i++){
  //       if( i % 100 === 0){
  //         console.log(i);
  //       }
  //     }
  //     resolve(888);
  //   });
  // }

  public ligarSpinner() {
    this.toggleSpinner(true);
  }

  public desligarSpinner() {
    this.toggleSpinner(false);
  }

  public toggleSpinner(valor: boolean) {
    this.spinnerService.mostrarSpinner = valor;
  }

  public gerarPalpites(): void {
    //TODO Utilizar Map para definição da estratégia
    console.log("GERAR PALPITES");
    this.spinnerService.mostrarSpinner = true;
    // this.changeDetector.markForCheck();
    // if (TipoLoteriaEnum.MEGASENA == this.tipoLoteria) {
    //TODO LIGAR AMPULHETA

      try {
        this.leitorResultadosService.montadorResultado = this.montadorResultadoMegasenaService;
        this.leitorResultadosService.extrairJogos(
          this.conteudoArquivoResultado
        );
        this.tratarResponse(
          this.montadorResultadoMegasenaService.resultadosJogos
        );
        // this.leitorResultadosService.carregarResultados(this.arquivoResultados,
        //   this.montadorResultadoMegasenaService)
        //   .then((response) => {
        //     this.tratarResponse(response.resultadosJogos);
        //   });
        // }
      } catch (erro) {
        this.mensagemErro = erro;
      }

  }

  private tratarResponse(resultadoJogos) {
    this.ordenarDezenas(resultadoJogos);
    const apenasDezenasNumericas = this.extrairApenasDezenas(resultadoJogos);

    this.geradorDezenasMegaSenaService.gerarProbabilidades(
      apenasDezenasNumericas
    );

    // this.testeGeradorProbabilidadesService.testarGeracaoPorPossibilidades(
    //   resultadoJogos
    // );
  }

  private extrairApenasDezenas(
    resultadoJogos: Array<ResultadoJogo>
  ): Array<Array<number>> {
    const apenasDezenasArray: Array<Array<number>> = [];
    resultadoJogos.forEach(resultado => {
      apenasDezenasArray.push([...resultado.dezenas]);
    });
    return apenasDezenasArray;
  }

  private ordenarDezenas(resultadosJogos) {
    resultadosJogos.forEach(resultadoJogo => {
      //
      resultadoJogo.dezenas.sort(this.ordenarNumerico);
      //
    });
  }

  private ordenarNumerico(a: number, b: number) {
    if (a > b) return 1;
    if (a < b) return -1;
    if (a === b) return 0;
  }
}
