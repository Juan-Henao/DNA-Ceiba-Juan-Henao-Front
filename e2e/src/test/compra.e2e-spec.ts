import { browser, by, element, protractor } from 'protractor';
import { compraGestionarPage } from '../page/compra/compraGestionar.po';


describe('workspace-project Producto', () => {
    let page: compraGestionarPage;

    beforeEach(() => {
        page = new compraGestionarPage();
        browser.get('/compra/gestionar')
    });

    it('should create a new compra', async () => {

        await page.estadoCompraInput.click();

        await browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();


        await browser.actions().sendKeys(protractor.Key.ENTER).perform();

        await page.clienteCompraInput.click();

        await browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
 

        await browser.actions().sendKeys(protractor.Key.ENTER).perform();


        element.all(by.tagName("body > app-root > app-compra > div > div > div > div.card.border-dark > div > table > tbody > tr:nth-child(2) > td:nth-child(4)")).each(function (row) {
            row.getText().then(function (text) {
                expect(text).toContain("12345");
            })
        }) 

    });

    it('should edit a compra', () => {
        browser.get('/compra')
        page.editarButtonCompra.click();

        page.estadoCompraInput.click();
        for (let i = 0; i < 3; i++) {

            browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
        }
        browser.actions().sendKeys(protractor.Key.ENTER).perform();

        page.clienteCompraInput.click();

        browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();

        browser.sleep(500);

        browser.actions().sendKeys(protractor.Key.ENTER).perform();


        element.all(by.tagName("body > app-root > app-compra > div > div > div > div.card.border-dark > div > table > tbody > tr:nth-child(1) > td:nth-child(4)")).each(function (row) {
            row.getText().then(function (text) {
                expect(text).toContain("12345");
            })
        }) 
    })

});
