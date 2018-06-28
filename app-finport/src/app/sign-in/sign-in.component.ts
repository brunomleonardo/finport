import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResponseDto } from '../models/response';
import { ToastrService } from 'ngx-toastr';
import { DtoUser } from '../models/user';
import { LoaderService } from '../services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  username: String = 'bleonardo';
  password: String = '123';
  isLoginError: boolean = false;
  message: String = '';

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
  }

  onSubmitForm(form: NgForm) {
    console.log(localStorage);
    this.loaderService.setLoaderVisibility(true);
    this.userService.loginUser(form.value.username, form.value.password)
      .subscribe(
        (data: ResponseDto<DtoUser>) => {
          this.loaderService.setLoaderVisibility(false);
          if (data.status) {
            this.toastr.success(data.message);
            localStorage.setItem('jwtToken', data.accessToken);
            localStorage.setItem('username', data.data.first_name + " " + data.data.last_name);
            localStorage.setItem('userId', data.data.id.toString());
            this.userService.setLoggedInState(true);
            this.userService.setUserName(data.data.first_name + " " + data.data.last_name);
            this.router.navigate(['/dashboard']);
            this.userService.setLoggedInState(true);
          } else {
            this.loaderService.setLoaderVisibility(false);
            this.userService.setLoggedInState(false);
            this.toastr.success(data.message);
          }
        });
  }
}
