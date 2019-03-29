import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';

import { TypeFormComponent } from '../type-form/type-form.component';

@Component({
  selector: 'app-type-add',
  templateUrl: './type-add.component.html',
  styleUrls: ['./type-add.component.css']
})
export class TypeAddComponent implements OnInit {

  dialogRef: MatDialogRef<TypeFormComponent>;

  constructor(private dialog: MatDialog) { }

  openDialog() {
    this.dialogRef = this.dialog.open(TypeFormComponent, {
      data: {
        mode: 'new'
      }
    });
  }

  ngOnInit() {
  }

}
