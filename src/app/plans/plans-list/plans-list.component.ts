import { PlansService } from './../shared/plans.service';
import { PlansDragAndDropService } from './../shared/plans-drag-and-drop.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlanModel } from '../shared/plan-model';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.css']
})

export class PlansListComponent implements OnInit, OnDestroy {

  plans: PlanModel[];
  allPlans: PlanModel[];
  connectedLists: string[] = [];
  showFilter = false;
  plansListSubscribe: Subscription;

  constructor(private plansService: PlansService,
              public plansDragAndDrop: PlansDragAndDropService) { }

  ngOnInit() {
    this.plansService.getForList();

    this.plansListSubscribe = this.plansService.plansListEvent.subscribe(data => {
      this.plans = data;
      this.allPlans = data;
      data.forEach(plan => {
        this.connectedLists.push(`${plan.id}`);
      });
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
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  canDropPredicate() {
    const me = this;
    return (drag: CdkDrag<Element>, drop: CdkDropList<Element>): boolean => {
      const fromBounds = drag.dropContainer.element.nativeElement.getBoundingClientRect();
      const toBounds = drop.element.nativeElement.getBoundingClientRect();

      if (!me.intersect(fromBounds, toBounds)) {
        return true;
      }

      // This gross but allows us to access a private field for now.
      const pointerPosition: any = drag['_dragRef']['_pointerPositionAtLastDirectionChange'];
      // They Intersect with each other so we need to do some calculations here.
      if (me.insideOf(fromBounds, toBounds)) {
        return !me.pointInsideOf(pointerPosition, fromBounds);
      }

      if (me.insideOf(toBounds, fromBounds) && me.pointInsideOf(pointerPosition, toBounds)) {
        return true;
      }
      return false;
    };
  }

  intersect(r1: DOMRect | ClientRect, r2: DOMRect | ClientRect): boolean {
    return !(r2.left > r1.right ||
      r2.right < r1.left ||
      r2.top > r1.bottom ||
      r2.bottom < r1.top);
  }

  insideOf(innerRect: DOMRect | ClientRect, outerRect: DOMRect | ClientRect): boolean {
    return innerRect.left >= outerRect.left &&
      innerRect.right <= outerRect.right &&
      innerRect.top >= outerRect.top &&
      innerRect.bottom <= outerRect.bottom &&
      !(
        innerRect.left === outerRect.left &&
        innerRect.right === outerRect.right &&
        innerRect.top === outerRect.top &&
        innerRect.bottom === outerRect.bottom
      );
  }

  pointInsideOf(position: any, rect: DOMRect | ClientRect) {
    return position.x >= rect.left &&
      position.x <= rect.right &&
      position.y >= rect.top &&
      position.y <= rect.bottom;
  }
}
