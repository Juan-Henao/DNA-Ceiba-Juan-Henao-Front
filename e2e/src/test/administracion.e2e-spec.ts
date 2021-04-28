import { browser } from 'protractor';
import { administracionPage } from '../page/administracion/administracion.po';


describe('workspace-project Producto', () => {
    let page: administracionPage;

    beforeEach(() => {
        page = new administracionPage();
        browser.get('/administracion')
    });

    it('should have correct titles and button text', () => {
        expect(page.compraLabel.getText()).toEqual('Gestionar Compras');
        expect(page.buttonCompras.getText()).toEqual('Gestionar')

        expect(page.labelItemssCompra.getText()).toEqual('Gestionar Items de la Compra');
        expect(page.buttonItemsCompra.getText()).toEqual('Gestionar')

        expect(page.labelCliente.getText()).toEqual('Gestionar Clientes');
        expect(page.buttonCliente.getText()).toEqual('Gestionar')
    });


});
