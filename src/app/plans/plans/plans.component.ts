import { Component, OnInit, Input } from '@angular/core';

import { ApiService } from './../../core/shared/api.service';
import { PlansService } from './../shared/plans.service';
import { PlanModel } from './../shared/plan-model';
import { PlansDragAndDropService } from './../shared/plans-drag-and-drop.service';
import { UserModel } from './../shared/user-model';


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  @Input() plan: any;
  user: UserModel;
  subPlans: PlanModel[];

  constructor(public plansDragAndDrop: PlansDragAndDropService,
              private plansService: PlansService,
              private api: ApiService) { }

  ngOnInit() {
    this.api.getUsersById(this.plan.idAccountable).subscribe(data => this.user = data);
    const subPlansArray = this.plansService.getForComponent(this.plan.id);
    this.subPlans = subPlansArray == null || subPlansArray.length === 0 ? [] : subPlansArray;
  }

}
