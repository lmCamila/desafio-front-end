import { PlanModel } from './../../plans/shared/plan-model';
import { TypeModel } from '../../type/shared/type-model';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../plans/shared/user-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpConf = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpCliente: HttpClient) { }

  getPlans() {
    return this.httpCliente.get<PlanModel[]>(`${environment.apiUrl}/plans`).pipe(take(1));
  }

  getTypes() {
    return this.httpCliente.get<TypeModel[]>(`${environment.apiUrl}/types`).pipe(take(1));
  }

  getUsers() {
    return this.httpCliente.get<UserModel[]>(`${environment.apiUrl}/users`).pipe(take(1));
  }

  createPlan(plan) {
    return this.httpCliente.post(`${environment.apiUrl}/plans`, plan, this.httpConf).pipe(take(1));
  }
  createType(type) {
    return this.httpCliente.post(`${environment.apiUrl}/types`, type, this.httpConf).pipe(take(1));
  }
}
