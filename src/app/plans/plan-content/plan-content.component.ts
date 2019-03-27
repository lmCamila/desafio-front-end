import { PlanModel } from './../shared/plan-model';
import { Component, OnInit, Input, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-plan-content',
  templateUrl: './plan-content.component.html',
  styleUrls: ['./plan-content.component.css']
})
export class PlanContentComponent implements OnInit {

  @Input() plan: PlanModel;

  constructor() { }

  ngOnInit() { }


}
