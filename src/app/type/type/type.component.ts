import { MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { TypeModel } from '../shared/type-model';
import { Router } from '@angular/router';
import { TypeNewComponent } from '../type-new/type-new.component';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  @Input() type: TypeModel;
  dialogRef: MatDialogRef<TypeNewComponent>;
  constructor(private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  openEdit() {
    this.dialogRef = this.dialog.open(TypeNewComponent);
    this.router.navigate([`/type/edit/${this.type.id}`]);
  }
}
