import { PlansFormComponent } from './../plans-form/plans-form.component';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans-add-button',
  templateUrl: './plans-add-button.component.html',
  styleUrls: ['./plans-add-button.component.css']
})
export class PlansAddButtonComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet,
              private router: Router) { }

  ngOnInit() {
  }

  openFormNew() {
    this.bottomSheet.open(PlansFormComponent);
    this.router.navigate(['planner/new']);
  }

}
