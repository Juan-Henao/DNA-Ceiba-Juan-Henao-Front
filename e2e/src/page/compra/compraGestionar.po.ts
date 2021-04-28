import { by, element } from 'protractor';

export class compraGestionarPage {


    get estadoCompraInput() {
        return element(by.id('estadoCompra'));
    }

    get clienteCompraInput() {
        return element(by.id('cliente'));
    }

    get sumbitButtonCompra() {
        return element(by.id('sumbitCompra'));
    }
    
    get editarButtonCompra() {
        return element(by.id('editarCompra'));
    }

}
