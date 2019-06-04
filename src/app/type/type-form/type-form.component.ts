import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';

import { ApiService } from '../../core/shared/api.service';
import { TypeService } from '../shared/type.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { TypeModel } from '../shared/type-model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent implements OnInit {

  formType: FormGroup;
  modalRef: MatDialogRef<ModalComponent>;
  title = 'Cadastrar';
  id: number;
  matcher = new MyErrorStateMatcher();

  constructor(private api: ApiService,
              public dialogRef: MatDialogRef<TypeFormComponent>,
              private formBuilder: FormBuilder,
              private modal: MatDialog,
              private typeService: TypeService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.formType = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.verifyMode();
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.formType.valid) {
      // verifica se o modo da modal é novo e faz a requisição com os dados para a api
      if (this.data.mode === 'new') {
        this.api.createType(this.formType.value).subscribe(
          success => {
            this.typeService.getListFromApi();
            this.modalRef = this.modal.open(ModalComponent, {
              data: {
                message: 'Tipo inserido com sucesso!',
                cancel: false
              }
            });
            this.formType.reset();
            this.dialogRef.close();
          },
          error => {
            this.modalRef = this.modal.open(ModalComponent, {
              data: {
                message: 'Erro! Tipo não pode ser inserido.',
                cancel: false
              }
            });
          }
        );
      } else if ( this.data.mode === 'edit') {
        this.api.updateType(this.formType.value, this.id).subscribe(
          success => {
            this.typeService.getListFromApi();
            this.modalRef = this.modal.open(ModalComponent, {
              data: {
                message: 'Tipo alterado com sucesso!',
                cancel: false
              }
            });
            this.formType.reset();
            this.dialogRef.close();
          },
          error => {
            this.modalRef = this.modal.open(ModalComponent, {
              data: {
                message: 'Erro! Tipo não pode ser inserido.',
                cancel: false
              }
            });
          }
        );
      }
    }
  }

  // verifica a rota
  verifyMode() {
    if (this.data.mode === 'new') {
      this.title = 'Cadastrar';
    } else {
      this.title = 'Editar';
      this.api.getTypeById(this.data.id).subscribe(data => this.fillFormType(data));
      this.id = this.data.id;
    }
  }

 // preenche formulário
  fillFormType(type: TypeModel) {
    this.formType.patchValue({
      name: type.name,
      description: type.description
    });
  }
}
