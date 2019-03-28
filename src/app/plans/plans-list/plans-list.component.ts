import { PlansService } from './../shared/plans.service';
import { PlansDragAndDropService } from './../shared/plans-drag-and-drop.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlanModel } from '../shared/plan-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.css']
})
export class PlansListComponent implements OnInit, OnDestroy {

  plans: PlanModel[];

  plansListSubscribe: Subscription;

  constructor(private plansService: PlansService,
              public plansDragAndDrop: PlansDragAndDropService) { }

  ngOnInit() {
    this.plansService.getForList();

    this.plansListSubscribe = this.plansService.plansListEvent.subscribe( data => {
      this.plans = data;
    });
  }

  ngOnDestroy() {
    this.plansListSubscribe.unsubscribe();
  }
}
