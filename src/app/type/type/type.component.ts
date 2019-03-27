import { Component, OnInit, Input } from '@angular/core';
import { TypeModel } from '../shared/type-model';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  @Input() type: TypeModel;
  constructor() { }

  ngOnInit() {
  }

}
