import { browser, by, element } from 'protractor';
import { clienteGestionarPage } from '../page/cliente/clienteGestionar.po';


describe('workspace-project Producto', () => {
    let page: clienteGestionarPage;

    beforeEach(() => {
        page = new clienteGestionarPage();
        browser.get('/cliente/gestionar')
    });
    
    it('should create a new client', () => {

        page.nombresClienteInput.sendKeys('Clientes Test');
        page.apellidosClienteInput.sendKeys('Test Clientes');
        page.identificacionClienteInput.sendKeys('789456');
        page.emailClienteInput.sendKeys('cliente@test.com');
        page.sumbitButtonCliente.click(); 

        element.all(by.tagName("body > app-root > app-cliente > div > div > div > div.card.border-dark > div > table > tbody > tr:nth-child(5) > td:nth-child(5)")).each(function(row){
            row.getText().then(function(text){
                expect(text).toContain("789456");
            })
        })
    });

    it('should edit a client', () => {
            browser.get('/cliente')
            page.editarButtonCliente.click();
            page.nombresClienteInput.sendKeys('Juan');
            page.apellidosClienteInput.sendKeys('Henao');
            page.identificacionClienteInput.sendKeys('12345');
            page.sumbitButtonCliente.click();
    
            element.all(by.tagName("body > app-root > app-cliente > div > div > div > div.card.border-dark > div > table > tbody > tr:nth-child(1) > td:nth-child(5)")).each(function(row){
                row.getText().then(function(text){
                    expect(text).toContain("12345");
                })
            })
        });

});
