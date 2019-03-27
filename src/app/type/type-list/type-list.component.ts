import { ApiService } from './../../core/shared/api.service';
import { TypeModel } from './../shared/type-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {
  types: TypeModel[];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getTypes().subscribe( dados => {
      this.types = dados;
    });
  }

}
