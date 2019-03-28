import { ApiService } from './../../core/shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-type-new',
  templateUrl: './type-new.component.html',
  styleUrls: ['./type-new.component.css']
})
export class TypeNewComponent implements OnInit {
  formType: FormGroup;
  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<TypeNewComponent>,
              private api: ApiService) {
      this.formType = this.formBuilder.group({
        name: [null, [Validators.required]],
        description: [null]
      });
   }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.formType.valid) {
      this.api.createType(this.formType.value).subscribe( dados => console.log(dados));
    }
  }
}
