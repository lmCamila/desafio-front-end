import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { ApiService } from '../../core/shared/api.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { PlansService } from './../shared/plans.service';
import { PlanModel } from './../shared/plan-model';
import { TypeModel } from '../../type/shared/type-model';
import { TypeFormComponent } from 'src/app/type/type-form/type-form.component';
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
  dialogRef: MatDialogRef<TypeFormComponent>;
  modalRef: MatDialogRef<ModalComponent>;
  title = 'Novo';
  id: number;


  constructor(private apiConnection: ApiService,
              private formBuilder: FormBuilder,
              private bottomSheetRef: MatBottomSheetRef<PlansFormComponent>,
              public dialog: MatDialog,
              private planService: PlansService,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {

    this.formPlan = formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
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

    this.verifyMode();
  }

  filterAccountable(event: KeyboardEvent) {
    const patern = `.*${(event.target as HTMLInputElement).value}`;
    this.users = this.allUsers.filter(user => new RegExp(patern, 'gi').test(user.name));
  }

  filterPlans(event: KeyboardEvent) {
    const patern = `.*${(event.target as HTMLInputElement).value}`;
    this.plans = this.allPlans.filter(plan => new RegExp(patern, 'gi').test(plan.name));
  }

  onSubmit() {
    let valueSubmit = Object.assign({}, this.formPlan.value);
    valueSubmit = Object.assign(valueSubmit, {
      idAccountable: this.planService.getUserId(this.allUsers, this.formPlan.value.idAccountable),
      start: this.formPlan.value.start == null ? null : String(this.formPlan.value.start),
      end: this.formPlan.value.end == null ? null : String(this.formPlan.value.end),
      status: 'Aguardando início'
      /*  idBelongsTo: this.formPlan.value.idBelongsTo == null ||
      this.formPlan.value.idBelongsTo === '' ? 0 : this.formPlan.value.idBelongsTo */
    });
    if (this.formPlan.valid) {
      // verifica o modo da botom sheet e faz a requisição na api
      if (this.data.mode === 'new') {
        this.apiConnection.createPlan(valueSubmit).subscribe(data => {
          if (data) {
            this.planService.getForList();
            this.modalRef = this.dialog.open(ModalComponent, {
              data: {
                message: 'Plano inserido com sucesso!',
                cancel: false
              }
            });
            this.formPlan.reset();
            this.bottomSheetRef.dismiss();
          } else {
            this.modalRef = this.dialog.open(ModalComponent, {
              data: {
                message: 'Erro! Plano não pode ser inserido.',
                cancel: false
              }
            });
          }
        });
      } else if (this.data.mode === 'edit') {
        this.apiConnection.updatePlan(valueSubmit, this.id).subscribe(data => {
          if (data) {
            this.planService.getForList();
            this.modalRef = this.dialog.open(ModalComponent, {
              data: {
                message: 'Plano alterado com sucesso!',
                cancel: false
              }
            });
          } else {
            this.modalRef = this.dialog.open(ModalComponent, {
              data: {
                message: 'Erro! Plano não pode ser alterado.',
                cancel: false
              }
            });
          }
        });
      }
    }
  }
  openDialog() {
    this.dialogRef = this.dialog.open(TypeFormComponent);
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  verifyMode() {
    if (this.data.mode === 'new') {
      this.title = 'Cadastrar';
    } else {
      this.title = 'Editar';
      this.apiConnection.getPlansById(this.data.id).subscribe(data => this.fillFormPlan(data));
      this.id = this.data.id;
    }
  }

  fillFormPlan(plan: PlanModel) {
    const belongsTo = this.allPlans.filter(p => p.id === plan.idBelongsTo);
    const accountable = this.allUsers.filter(u => u.id === plan.idAccountable)[0].name;
    plan = Object.assign(plan, {
      idAccountable: this.allUsers.filter(u => u.id === plan.idAccountable)[0].name,
      start: new Date(plan.start),
      end: new Date(plan.end),
      idBelongsTo: belongsTo.length !== 0 ? belongsTo[0].name : plan.idBelongsTo
    });

    this.formPlan.patchValue(plan);
  }
}
