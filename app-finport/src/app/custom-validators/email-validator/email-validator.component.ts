// import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  NG_VALIDATORS,
  FormsModule,
  FormGroup,
  FormControl,
  ValidatorFn,
  Validator
} from '@angular/forms';
import { Directive } from '@angular/core';

// @Component({
//   selector: 'app-email-validator',
//   templateUrl: './email-validator.component.html',
//   styleUrls: ['./email-validator.component.css']
// })

@Directive({
  selector: '[emailvalidator][ngModel]',
  providers: [
      {
          provide: NG_VALIDATORS,
          useExisting: EmailValidatorComponent,
          multi: true
      }
  ] 
})

export class EmailValidatorComponent implements Validator {
  validator: ValidatorFn;
  constructor() {
      this.validator = this.emailValidator();
  }
  validate(c: FormControl) {
      return this.validator(c);
  }
  emailValidator(): ValidatorFn {
      return (c: FormControl) => {
          let isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(c.value);
          if (isValid) {
              return null;
          } else {
              return {
                  emailvalidator: {
                      valid: false
                  }
              };
          }
      }
  }
}
