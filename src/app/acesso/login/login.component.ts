import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Autenticacao } from '../../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<
    string
  >();

  public valid: boolean = true;

  public form: FormGroup = new FormGroup({
    email: new FormControl(null),
    senha: new FormControl(null),
  });

  constructor(private autenticacao: Autenticacao) {}

  ngOnInit(): void {}
  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }
  public autenticar(): void {
    console.log(
      this.autenticacao.autenticar(this.form.value.email, this.form.value.senha)
    );
  }
}
