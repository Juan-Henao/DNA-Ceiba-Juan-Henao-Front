import { by, element } from 'protractor';

export class itemsCompraGestionarPage {


    get cantidadItemsCompraInput() {
        return element(by.id('cantidad'));
    }
    
    get anchoitemsCompraInput() {
        return element(by.id('ancho'));
    }
    
    get largoitemsCompraInput() {
        return element(by.id('largo'));
    }
   
    get parametroItemsCompraInput() {
        return element(by.id('parametro'));
    }

    get compraItemsCompraInput() {
        return element(by.id('compra'));
    }
    
    get editarButtonitemsCompra() {
        return element(by.id('editarItemsCompra'));
    }

    get sumbitButtonitemsCompra() {
        return element(by.id('sumbitItemsCompra'));
    }

}
