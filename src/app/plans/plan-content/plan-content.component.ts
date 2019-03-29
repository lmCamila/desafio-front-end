import { MatBottomSheet } from '@angular/material';
import { PlanModel } from './../shared/plan-model';
import { Component, OnInit, Input, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { PlansFormComponent } from '../plans-form/plans-form.component';

@Component({
  selector: 'app-plan-content',
  templateUrl: './plan-content.component.html',
  styleUrls: ['./plan-content.component.css']
})
export class PlanContentComponent implements OnInit {

  @Input() plan: PlanModel;

  constructor(private bottomSheet: MatBottomSheet,
              private router: Router) { }

  ngOnInit() { }

  openEdit() {
    this.bottomSheet.open(PlansFormComponent);
    this.router.navigate(['planner/edit/', this.plan.id]);
  }

}
