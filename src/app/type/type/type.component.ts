import { MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';

import { TypeModel } from '../shared/type-model';
import { TypeFormComponent } from '../type-form/type-form.component';


@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  @Input() type: TypeModel;
  dialogRef: MatDialogRef<TypeFormComponent>;

  constructor(private dialog: MatDialog) { }

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
}
