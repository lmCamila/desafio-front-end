import { ApiService } from './../../core/shared/api.service';
import { UserModel } from './../shared/user-model';
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
  user: UserModel;

  constructor(private bottomSheet: MatBottomSheet,
              private api: ApiService) { }

  ngOnInit() {
    this.api.getUsersById(this.plan.idAccountable).subscribe(user => this.user = user);
  }

  openEdit() {
    this.bottomSheet.open(PlansFormComponent, {
      data: {
        mode: 'edit',
        id: this.plan.id
      }
    });
  /*   this.router.navigate([ `planner/edit/${this.plan.id}`]); */
  }

}
