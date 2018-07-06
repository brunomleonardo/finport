import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
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
  isLoginError = false;
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
          if (data.status) {
            // session variables
            localStorage.setItem('jwtToken', data.accessToken);
            localStorage.setItem('username', data.data.first_name + '' + data.data.last_name);
            localStorage.setItem('userId', data.data.id.toString());
            // update view data and session state
            this.userService.setUserName(data.data.first_name + '' + data.data.last_name);
            this.userService.setLoggedInState(true);
            // show popup and navigate to main page
            this.toastr.success(data.message);
            this.router.navigate(['/dashboard']);
          } else {
            this.userService.setLoggedInState(false);
            this.toastr.error(data.message);
          }
          this.loaderService.setLoaderVisibility(false);
        });
  }
}
