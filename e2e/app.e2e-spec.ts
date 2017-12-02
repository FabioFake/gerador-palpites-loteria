import { GeradorLoteriasPage } from './app.po';

describe('gerador-loterias App', () => {
  let page: GeradorLoteriasPage;

  beforeEach(() => {
    page = new GeradorLoteriasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
