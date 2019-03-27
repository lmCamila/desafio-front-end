import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-type-new',
  templateUrl: './type-new.component.html',
  styleUrls: ['./type-new.component.css']
})
export class TypeNewComponent implements OnInit {
  formType: FormGroup;
  constructor(private formBuilder: FormBuilder) {
      this.formType = this.formBuilder.group({
        name: [null, [Validators.required]],
        description: [null]
      });
   }

  ngOnInit() {
  }

}
