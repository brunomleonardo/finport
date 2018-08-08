import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { ResponseDto } from '../models/response';
import { ToastrService } from 'ngx-toastr';
import { UsersDTO } from '../models/user';
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
        (data: ResponseDto<UsersDTO>) => {
          if (data.Status) {
            // session variables
            localStorage.setItem('jwtToken', data.AccessToken);
            localStorage.setItem('username', data.Data.FirstName + '' + data.Data.LastName);
            localStorage.setItem('userId', data.Data.UserId.toString());
            // update view data and session state
            this.userService.setUserName(data.Data.FirstName + '' + data.Data.LastName);
            this.userService.setLoggedInState(true);
            // show popup and navigate to main page
            this.toastr.success(data.Message);
            this.router.navigate(['/dashboard']);
          } else {
            this.userService.setLoggedInState(false);
            this.toastr.error(data.Message);
          }
          this.loaderService.setLoaderVisibility(false);
        });
  }
}
