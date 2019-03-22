
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PlanModel } from './plan-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpCliente: HttpClient) { }

  getPlans() {
    return this.httpCliente.get<PlanModel[]>(`${environment.apiUrl}/plans`).pipe(take(1));
  }
}
