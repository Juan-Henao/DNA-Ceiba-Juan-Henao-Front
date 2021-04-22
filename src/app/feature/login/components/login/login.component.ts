import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../shared/model/usuario';
import { LoginService } from '../../shared/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public titulo = 'Iniciar sesión';
  public loginForm: FormGroup;
  private usuario: Usuario;

  constructor(protected loginService: LoginService) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.construirFormularioProducto();
  }

  private construirFormularioProducto() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public login() {
    this.fabricarUsuario();
  }

  private fabricarUsuario() {
    this.usuario.username = this.loginForm.get('username').value;
    this.usuario.password = this.loginForm.get('password').value;
  }

}
