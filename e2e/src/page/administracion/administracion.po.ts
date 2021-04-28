import { by, element } from 'protractor';

export class administracionPage {

  get compraLabel() {
    return element(by.id('labelCompras'));
  }

  get buttonCompras() {
    return element(by.id('fontCompras'));
  }

  get labelItemssCompra() {
    return element(by.id('labelItemsCompras'));
  }

  get buttonItemsCompra() {
    return element(by.id('fontItemsCompras'));
  }

  get labelCliente() {
    return element(by.id('labelCliente'));
  }

  get buttonCliente() {
    return element(by.id('fontCliente'));
  }
  
  
}
