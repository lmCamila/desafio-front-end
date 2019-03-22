import { ApiService } from '../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PlanModel } from '../shared/plan-model';

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.css']
})
export class PlansListComponent implements OnInit {

  plans;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getPlans().subscribe(dados => {
      this.plans = dados;
    });
  }
  // {name: string, status: string, data: string, user: string, email: string, avatar: string, interestedPeople: number[]}
  drop(event: CdkDragDrop<PlanModel[]>) {
    moveItemInArray(this.plans, event.previousIndex, event.currentIndex);
  }

}
