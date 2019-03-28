import { ApiService } from './../../core/shared/api.service';
import { Injectable, EventEmitter } from '@angular/core';
import { TypeModel } from './type-model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  typeList: TypeModel[];

  typeEvent =  new EventEmitter<TypeModel[]>();
  constructor(private api: ApiService) { }

  getListFromApi() {
    this.api.getTypes().subscribe( data => {
      this.typeList = data.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        return 0;
      });
      this.typeEvent.emit(this.typeList);
    });
  }
}
