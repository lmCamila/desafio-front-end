import { ApiService } from '../../core/shared/api.service';
import { Injectable, EventEmitter } from '@angular/core';

import { PlanModel } from './plan-model';
import { UserModel } from './user-model';
@Injectable({
  providedIn: 'root'
})
export class PlansService {
  plansList: PlanModel[];

  plansListEvent = new EventEmitter<PlanModel[]>();

  constructor(private api: ApiService) { }

  getForList() {
    if (this.plansList == null) {
      this.api.getPlans().subscribe(dados => {
        this.plansList = dados;
        this.plansListEvent.emit(this.plansList.filter(p => p.idBelongsTo == null || p.idBelongsTo === 0));
      });
    } else {
      this.plansListEvent.emit(this.plansList.filter(p => p.idBelongsTo == null || p.idBelongsTo === 0));
    }
  }

  getForComponent(idBelongsTo: number) {
    return this.plansList.filter(p => p.idBelongsTo === idBelongsTo );
  }

  getUserId(users: UserModel[], userName?: string) {
    const user = users.filter(u => u.name === userName)[0];
    return user.id;
  }
}
