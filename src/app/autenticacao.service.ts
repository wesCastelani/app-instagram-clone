import { Usuario } from './usario.model';
import * as fb from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Autenticacao {
  token_id: string;

  constructor(private router: Router) {}
  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    return fb
      .auth()
      .createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((res: any) => {
        delete usuario.senha;

        fb.database()
          .ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario);
      })
      .catch((err: Error) => {
        return err;
      });
  }
  public autenticar(email: string, senha: string): Promise<any> {
    return fb
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then((res: any) => {
        fb.auth()
          .currentUser.getIdToken()
          .then((idToken: string) => {
            this.token_id = idToken;
            localStorage.setItem('idToken', idToken);
            this.router.navigate(['/home']);
          });
      })
      .catch((err: Error) => {
        err;
      });
  }
  public autenticado(): boolean {
    let x: boolean = true;

    if (
      this.token_id === undefined &&
      localStorage.getItem('idToken') != null
    ) {
      this.token_id = localStorage.getItem('idToken');
    }

    if (this.token_id === undefined) {
      this.router.navigate(['/']);
    }

    if (this.token_id !== undefined) {
      x = true;
    } else {
      x = false;
    }
    return x;
  }
  public sair(): void {
    fb.auth()
      .signOut()
      .then(() => {
        localStorage.removeItem('idToken');
        this.token_id = undefined;
        this.router.navigate(['']);
      });
  }
}
