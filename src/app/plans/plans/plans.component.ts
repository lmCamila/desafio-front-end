import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  @Input() plan: any;

  constructor() { }

  ngOnInit() {
  }
  drop(event) {
   // moveItemInArray(this.plan., event.previousIndex, event.currentIndex);
  }
}
