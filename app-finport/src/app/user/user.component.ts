import { Component, OnInit } from '@angular/core';
import { EmailValidatorComponent } from '../custom-validators/email-validator/email-validator.component';
import { DtoUser } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends EmailValidatorComponent implements OnInit {

  user: DtoUser;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
