export abstract class GeradorProvaveisDezenas {

    protected provaveisDezenas: Array<number>;

    /**
     * 
     * @param provaveisDezenas Array de Dezenas a serem modificados de acordo com as Probalidades. 
     */
    public abstract carregarProvaveisDezenas(provaveisDezenas: Array<number>): Array<number>;

    public abstract adicionarAsProbabilidades(dezena: number): void;

    public abstract reset(): void;
}
