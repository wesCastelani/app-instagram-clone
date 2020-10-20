import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Bd } from '../../bd.service';
import * as firebase from 'firebase';
import { Progresso } from 'src/app/progresso.service';
import { Observable, Subject } from 'rxjs';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css'],
})
export class IncluirPublicacaoComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    titulo: new FormControl(null),
  });
  public email: string;
  public imagem: any;

  public porcentagemPub: string = 'pendente';
  public porcentagemUpload: number;

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<
    any
  >();

  constructor(private bd: Bd, private progresso: Progresso) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.form.value.titulo,
      imagem: this.imagem[0],
    });

    let acompanhamentoUpload = interval(1500);

    let continua = new Subject();

    continua.next(true);

    acompanhamentoUpload.pipe(takeUntil(continua)).subscribe(() => {
      this.porcentagemUpload =
        Math.round(
          this.progresso.estado.bytesTransferred /
            this.progresso.estado.totalBytes
        ) * 100;

      this.porcentagemPub = 'andamento';

      if (this.progresso.status === 'concluido') {
        this.porcentagemPub = 'concluido';

        this.atualizarTimeLine.emit();
        continua.next(false);
      }
    });
  }

  public preparaImagemUpload(eveto: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }
}
