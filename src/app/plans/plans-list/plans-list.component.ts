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
  allPlans: PlanModel[];
  showFilter = false;
  plansListSubscribe: Subscription;

  constructor(private plansService: PlansService,
              public plansDragAndDrop: PlansDragAndDropService) { }

  ngOnInit() {
    this.plansService.getForList();

    this.plansListSubscribe = this.plansService.plansListEvent.subscribe(data => {
      this.plans = data;
      this.allPlans = data;
    });
  }

  ngOnDestroy() {
    this.plansListSubscribe.unsubscribe();
  }

  showFilterOptions() {
    this.showFilter = !this.showFilter;
  }

  filterList(value: string) {
    switch (value) {
      case 'meus planos':
        this.plans = this.allPlans.filter(p => p.idAccountable === 2);
        this.showFilter = !this.showFilter;
        break;
      case 'cancelados':
        this.plans = this.allPlans.filter(p => p.status === 'Cancelado');
        this.showFilter = !this.showFilter;
        break;
      case 'iniciados':
        this.plans = this.allPlans.filter(p => p.status === 'Iniciado');
        this.showFilter = !this.showFilter;
        break;
      case 'aguardando':
        this.plans = this.allPlans.filter(p => p.status === 'Aguardando início');
        this.showFilter = !this.showFilter;
        break;
      case 'suspensos':
        this.plans = this.allPlans.filter(p => p.status === 'Suspenso');
        this.showFilter = !this.showFilter;
        break;
      case 'concluidos':
        this.plans = this.allPlans.filter(p => p.status === 'Concluído');
        this.showFilter = !this.showFilter;
        break;
      case 'todos':
        this.plans = this.allPlans;
        this.showFilter = !this.showFilter;
        break;
    }
  }
}
