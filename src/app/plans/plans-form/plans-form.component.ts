import { PlansService } from './../shared/plans.service';
import { PlanModel } from './../shared/plan-model';
import { ApiService } from '../../core/shared/api.service';
import { TypeModel } from '../../type/shared/type-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from '../shared/user-model';
import { MatDialog, MatDialogRef, MatBottomSheetRef } from '@angular/material';
import { TypeNewComponent } from 'src/app/type/type-new/type-new.component';

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
  dialogRef: MatDialogRef<TypeNewComponent>;

  constructor(private apiConnection: ApiService,
              private formBuilder: FormBuilder,
              private bottomSheetRef: MatBottomSheetRef<PlansFormComponent>,
              public dialog: MatDialog,
              private planService: PlansService) {
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
    if (this.formPlan.valid) {
      let valueSubmit = Object.assign({}, this.formPlan.value);
      valueSubmit = Object.assign(valueSubmit, {
        idAccountable: this.planService.getUserId(this.allUsers, this.formPlan.value.idAccountable),
        start: String(this.formPlan.value.start),
        end: String(this.formPlan.value.end),
        status: 'Aguardando início',
        idBelongsTo: this.formPlan.value.idBelongsTo == null ? 0 : this.formPlan.value.idBelongsTo
      });
      this.apiConnection.createPlan(valueSubmit).subscribe( status => console.log(status));
      this.formPlan.reset();
      this.bottomSheetRef.dismiss();
    }
  }

  openDialog() {
    this.dialogRef = this.dialog.open(TypeNewComponent);
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}
