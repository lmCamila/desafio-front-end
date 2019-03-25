import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { PlanModel } from './plan-model';

@Injectable({
  providedIn: 'root'
})
export class PlansDragAndDropService {

  constructor() { }

  // {name: string, status: string, data: string, user: string, email: string, avatar: string, interestedPeople: number[]}
  drop(event: CdkDragDrop<PlanModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('move item');
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      console.log('transfer item');
                      }
  }
}
