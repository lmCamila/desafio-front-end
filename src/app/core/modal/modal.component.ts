import { ModalService } from './modal.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private modalService: ModalService) { }

  ngOnInit() {
  }

  onClickConfirm() {
    this.modalService.setConfirmAction(true);
    this.dialogRef.close();
    // this.router.navigate(['/']);
    // this.listService.setListContactResponsive(false);
  }

  onClickCancel() {
    this.modalService.setConfirmAction(false);
    this.dialogRef.close();
    // this.router.navigate(['/']);
    // this.listService.setListContactResponsive(false);
  }
}
