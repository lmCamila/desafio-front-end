import { TypeModel } from './type-model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PlanModel } from './plan-model';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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
}
