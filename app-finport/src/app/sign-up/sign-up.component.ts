import { Component, OnInit } from '@angular/core';
// import { EmailValidatorComponent } from '../custom-validators/email-validator/email-validator.component';
import { DtoUser } from '../models/user';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseDto } from '../models/response';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent implements OnInit {

  user: DtoUser = new DtoUser();
  emailPattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // this.resetForm();
    this.user.email = 'bleonardo2@alter-solutions.com';
    this.user.username = 'bleonardo';
    this.user.first_name = 'asd';
    this.user.last_name = 'adas';
    this.user.password = '123';
    this.user.password_confirmation = '123';
  }

  resetForm(form?: NgForm): void {
    if (form != null)
      form.reset();
    this.user = {
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
      password_confirmation: ''
    }
  }

  onSubmitForm(form: NgForm): void {
    this.userService.registerUser(form.value)
      .subscribe((data: ResponseDto<DtoUser>) => {
        console.log(data);
        if (data.status == true) {
          this.resetForm(form);
          this.toastr.success(data.message);
          localStorage.setItem('jwtToken', data.accessToken);
          localStorage.setItem('username', data.data.first_name + " " + data.data.last_name);
          localStorage.setItem('userId', data.data.id.toString());
          this.userService.setLoggedInState(true);
          this.userService.setUserName(data.data.first_name + " " + data.data.last_name);
          this.router.navigate(['/']);
        } else {
          this.toastr.error(data.message);
        }
      });
  }

}
