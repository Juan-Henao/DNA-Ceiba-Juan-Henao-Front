import { by, element } from 'protractor';

export class homePage {

  get administracionLabel() {
    return element(by.id('labelAdministracion'));
  }

  get buttonAdministracion() {
    return element(by.id('fontAdministracion'));
  }

  get labelItemssCompra() {
    return element(by.id('labelItemsCompra'));
  }

  get buttonItemsCompra() {
    return element(by.id('fontItemsCompras'));
  } 
  
}
