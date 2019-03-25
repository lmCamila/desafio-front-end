import { PlansService } from './../shared/plans.service';
import { PlanModel } from './../shared/plan-model';
import { PlansDragAndDropService } from './../shared/plans-drag-and-drop.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  @Input() plan: any;

  subPlans: PlanModel[];

  constructor(public plansDragAndDrop: PlansDragAndDropService,
              private plansService: PlansService) { }

  ngOnInit() {
    const subPlansArray = this.plansService.getForComponent(this.plan.id);
    this.subPlans = subPlansArray == null || subPlansArray.length === 0 ? [] : subPlansArray;
  }

}
