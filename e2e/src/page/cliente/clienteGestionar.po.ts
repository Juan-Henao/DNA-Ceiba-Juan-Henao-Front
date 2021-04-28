import { by, element } from 'protractor';

export class clienteGestionarPage {


    get nombresClienteInput() {
        return element(by.id('nombres'));
    }
    get apellidosClienteInput() {
        return element(by.id('apellidos'));
    }
    get identificacionClienteInput() {
        return element(by.id('identificacion'));
    }
    get emailClienteInput() {
        return element(by.id('email'));
    }
    get sumbitButtonCliente() {
        return element(by.id('sumbitCliente'));
    }
    get editarButtonCliente() {
        return element(by.id('editarCliente'));
    }

}
