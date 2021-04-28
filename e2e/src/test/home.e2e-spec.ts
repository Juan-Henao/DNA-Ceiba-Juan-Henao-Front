import { browser } from 'protractor';
import { homePage } from '../page/home/home';


describe('workspace-project Producto', () => {
    let page: homePage;

    beforeEach(() => {
        page = new homePage();
        browser.get('/home')
    });

    it('should have correct titles and button text home', () => {
        expect(page.administracionLabel.getText()).toEqual('Administración');
        expect(page.buttonAdministracion.getText()).toEqual('Administrar')

        expect(page.labelItemssCompra.getText()).toEqual('Gestionar Items de Compra');
        expect(page.buttonItemsCompra.getText()).toEqual('Gestionar')

    });


});
