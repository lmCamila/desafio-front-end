import { PlansService } from './../shared/plans.service';
import { ApiService } from './../../core/shared/api.service';
import { UserModel } from './../shared/user-model';
import { MatBottomSheet, MatDialogRef, MatDialog } from '@angular/material';
import { PlanModel } from './../shared/plan-model';
import { Component, OnInit, Input, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { PlansFormComponent } from '../plans-form/plans-form.component';
import { ModalComponent } from 'src/app/core/modal/modal.component';

@Component({
  selector: 'app-plan-content',
  templateUrl: './plan-content.component.html',
  styleUrls: ['./plan-content.component.css']
})
export class PlanContentComponent implements OnInit {

  @Input() plan: PlanModel;
  user: UserModel;
  modalRef: MatDialogRef<ModalComponent>;

  constructor(private bottomSheet: MatBottomSheet,
              private api: ApiService,
              private dialog: MatDialog,
              private planService: PlansService) { }

  ngOnInit() {
    this.api.getUsersById(this.plan.idAccountable).subscribe(user => this.user = user);
  }

  openEdit() {
    this.bottomSheet.open(PlansFormComponent, {
      data: {
        mode: 'edit',
        id: this.plan.id
      }
    });
  /*   this.router.navigate([ `planner/edit/${this.plan.id}`]); */
  }

  openDelete() {
    if (confirm(`Deseja realmente excluir ${this.plan.name}`)) {
      this.api.deletePlan(this.plan.id).subscribe(
        success => {
          this.planService.getForList();
          this.modalRef = this.dialog.open(ModalComponent, {
            data: {
              message: 'Plano excluído com sucesso.',
              cancel: false
            }
          });
        },
        error => {
          this.modalRef = this.dialog.open(ModalComponent, {
            data: {
              message: 'Erro! Tipo não pode ser excluído.',
              cancel: false
            }
          });
        }
      );
    }
  }
  updateStatus(value: string) {
    const plan = Object.assign(this.plan, {
      status: value
    });
    this.api.updatePlan(plan, this.plan.id).subscribe(
      success => {
        this.planService.getForList();
      },
      error => {
        this.modalRef = this.dialog.open(ModalComponent, {
          data: {
            message: 'Erro! Status do plano não pode ser atualizado.',
            cancel: false
          }
        });
      }
    );
  }

}
