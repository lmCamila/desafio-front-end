import { Subscription } from 'rxjs';
import { TypeModel } from './../shared/type-model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TypeService } from '../shared/type.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit, OnDestroy {
  types: TypeModel[];
  typeSubscribe: Subscription;
  constructor(private typeService: TypeService) {
    this.typeService.getListFromApi();
   }

  ngOnInit() {
    this.typeSubscribe = this.typeService.typeEvent.subscribe(data => this.types = data);
  }

  ngOnDestroy() {
    this.typeSubscribe.unsubscribe();
  }
}
