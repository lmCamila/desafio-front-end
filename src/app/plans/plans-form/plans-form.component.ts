import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans-form',
  templateUrl: './plans-form.component.html',
  styleUrls: ['./plans-form.component.css']
})
export class PlansFormComponent implements OnInit {

  constructor() { }

  onSubmit() {
    console.log('submit');
  }
  ngOnInit() {
  }

}
