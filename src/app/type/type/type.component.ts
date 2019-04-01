import { MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';

import { ApiService } from './../../core/shared/api.service';
import { TypeModel } from '../shared/type-model';
import { TypeFormComponent } from '../type-form/type-form.component';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { TypeService } from '../shared/type.service';


@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  @Input() type: TypeModel;
  dialogRef: MatDialogRef<TypeFormComponent>;
  modalRef: MatDialogRef<ModalComponent>;

  constructor(private dialog: MatDialog,
              private api: ApiService,
              private typeService: TypeService) { }

  ngOnInit() {
  }

  openEdit() {
    this.dialogRef = this.dialog.open(TypeFormComponent, {
      data: {
        mode: 'edit',
        id: this.type.id
      }
    });
  }

  openDelete() {
    if (confirm(`Deseja realmente excluir ${this.type.name}`)) {
      this.api.deleteType(this.type.id).subscribe(
        success => {
          this.typeService.getListFromApi();
          this.modalRef = this.dialog.open(ModalComponent, {
            data: {
              message: 'Tipo excluído com sucesso.',
              cancel: false
            }
          });
        },
        error => {
          this.modalRef = this.dialog.open(ModalComponent, {
            data: {
              message: 'Erro! Tipo não pode ser excluído.',
              cancel: false
            }
          });
        }
      );
    }
  }
}
