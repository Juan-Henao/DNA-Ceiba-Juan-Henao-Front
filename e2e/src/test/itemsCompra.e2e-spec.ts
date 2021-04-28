import { browser, by, element, protractor } from 'protractor';
import { itemsCompraGestionarPage } from '../page/itemsCompra/itemsCompraGestionar.po';


describe('workspace-project Producto', () => {
    let page: itemsCompraGestionarPage;

    beforeEach(() => {
        page = new itemsCompraGestionarPage();
        browser.get('/itemsCompra/gestionar')
    });

    it('should create a new itemsCompra', () => {

        page.cantidadItemsCompraInput.sendKeys(1);
        page.anchoitemsCompraInput.sendKeys(1);
        page.largoitemsCompraInput.sendKeys(1);

        page.parametroItemsCompraInput.click();

        browser.sleep(500);

        browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();

        browser.sleep(500);

        browser.actions().sendKeys(protractor.Key.ENTER).perform();

        page.compraItemsCompraInput.click();

        browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();

        browser.sleep(500);

        browser.actions().sendKeys(protractor.Key.ENTER).perform();

        element.all(by.tagName("body > app-root > app-compra > div > div > div > div.card.border-dark > div > table > tbody > tr:nth-child(2) > td:nth-child(6)")).each(function (row) {
            row.getText().then(function (text) {
                expect(text).toContain("500");
            })
        })
    });

    it('should edit a itemsCompra', () => {
        browser.get('/itemsCompra')
        page.editarButtonitemsCompra.click();
        page.cantidadItemsCompraInput.sendKeys(2);
        page.anchoitemsCompraInput.sendKeys(2);
        page.largoitemsCompraInput.sendKeys(2);

        browser.actions().sendKeys(protractor.Key.ENTER).perform();



        element.all(by.tagName("body > app-root > app-compra > div > div > div > div.card.border-dark > div > table > tbody > tr:nth-child(1) > td:nth-child(6)")).each(function (row) {
            row.getText().then(function (text) {
                expect(text).toContain("4000");
            })
        })
    });

});
