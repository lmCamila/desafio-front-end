import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { TypeNewComponent } from '../type-new/type-new.component';

@Component({
  selector: 'app-type-add',
  templateUrl: './type-add.component.html',
  styleUrls: ['./type-add.component.css']
})
export class TypeAddComponent implements OnInit {

  dialogRef: MatDialogRef<TypeNewComponent>;

  constructor(private dialog: MatDialog,
              private router: Router) { }

  openDialog() {
    this.dialogRef = this.dialog.open(TypeNewComponent);
    this.router.navigate(['type/new']);
  }

  ngOnInit() {
  }

}
