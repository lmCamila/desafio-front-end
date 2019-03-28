import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';

import { ApiService } from './../../core/shared/api.service';
import { TypeService } from '../shared/type.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeModel } from '../shared/type-model';

@Component({
  selector: 'app-type-new',
  templateUrl: './type-new.component.html',
  styleUrls: ['./type-new.component.css']
})
export class TypeNewComponent implements OnInit {

  formType: FormGroup;
  modalRef: MatDialogRef<ModalComponent>;
  title = 'Cadastrar';
  id: number;

  constructor(private api: ApiService,
              public dialogRef: MatDialogRef<TypeNewComponent>,
              private formBuilder: FormBuilder,
              private modal: MatDialog,
              private typeService: TypeService,
              private route: Router) {

    this.formType = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null]
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
      this.api.createType(this.formType.value).subscribe(data => {
        if (data) {
          this.typeService.getListFromApi();
          this.modalRef = this.modal.open(ModalComponent, {
            data: {
              message: 'Tipo inserido com sucesso!',
              cancel: false
            }
          });
          this.formType.reset();
        } else {
          this.modalRef = this.modal.open(ModalComponent, {
            data: {
              message: 'Erro! Tipo não pode ser inserido.',
              cancel: false
            }
          });
        }
      });
    }
  }

  verifyMode() {
    if (this.route.url.split('/')[2] === 'new') {
      this.title = 'Cadastrar';
    } else {
      this.title = 'Editar';
      this.id = Number(this.route.url.split('/')[3]);
      this.api.getTypeById(this.id).subscribe(data => this.fillFormType(data));
    }
  }

  fillFormType(type: TypeModel) {
    this.formType.patchValue({
      name: type.name,
      description: type.description
    });
  }
}
