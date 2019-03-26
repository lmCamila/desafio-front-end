import { PlansFormComponent } from './../plans-form/plans-form.component';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-plans-add-button',
  templateUrl: './plans-add-button.component.html',
  styleUrls: ['./plans-add-button.component.css']
})
export class PlansAddButtonComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  openFormNew() {
    this.bottomSheet.open(PlansFormComponent);
  }

}
