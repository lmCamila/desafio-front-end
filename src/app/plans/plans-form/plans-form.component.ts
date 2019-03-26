import { PlanModel } from './../shared/plan-model';
import { ApiService } from './../shared/api.service';
import { TypeModel } from './../shared/type-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserModel } from '../shared/user-model';

@Component({
  selector: 'app-plans-form',
  templateUrl: './plans-form.component.html',
  styleUrls: ['./plans-form.component.css']
})
export class PlansFormComponent implements OnInit {

  formPlan: FormGroup;
  types: TypeModel[];
  users: UserModel[];
  allUsers: UserModel[];
  plans: PlanModel[];
  allPlans: PlanModel[];

  constructor(private apiConnection: ApiService,
              private formBuilder: FormBuilder) {
    this.formPlan = formBuilder.group({
      name : [null, [Validators.required, Validators.minLength(5)]],
      idType: [1, [Validators.required]],
      idAccountable: [null, [Validators.required]],
      start: [null],
      end: [null],
      idBelongsTo: [null],
      description: [null],
      interestedPeople: [null],
      costs: [null]
    });
  }

  ngOnInit() {
    // pegar types do json server
    this.apiConnection.getTypes().subscribe(data => this.types = data);

    // pegar users do json serve, salvando em duas listas para fazer uma filtragem
    this.apiConnection.getUsers().subscribe(data => {
      this.users = data;
      this.allUsers = data;
    });

    // pegar planos do json server - usa duas listas para fazer filtragem
    this.apiConnection.getPlans().subscribe(data => {
      this.plans = data;
      this.allPlans = data;
    });
  }

  filterAccountable(event: KeyboardEvent) {
    const patern = `.*${(event.target as HTMLInputElement).value}`;
    this.users = this.allUsers.filter( user => new RegExp(patern, 'gi').test(user.name));
  }

  filterPlans(event: KeyboardEvent) {
    const patern = `.*${(event.target as HTMLInputElement).value}`;
    this.plans = this.allPlans.filter( plan => new RegExp(patern, 'gi').test(plan.name));
  }

  onSubmit() {
    console.log('submit');
  }

}
