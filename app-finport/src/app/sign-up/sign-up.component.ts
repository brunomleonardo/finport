import { Component, OnInit } from '@angular/core';
// import { EmailValidatorComponent } from '../custom-validators/email-validator/email-validator.component';
import { UsersDTO } from '../models/user';
import { UserService } from '../services/user.service';
import { NgForm, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseDto } from '../models/response';
import { Router } from '@angular/router';
import { CurrenciesDTO } from '../models/currencies';
import { ResourcesService } from '../services/resources.service';
import { Observable } from 'rxjs';
import { WalletsDTO } from '../models/wallet';

import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent implements OnInit {
  userRegistrationForm = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  user: UsersDTO = new UsersDTO();
  currencyId: number;
  walletAmount: number;
  currencies: CurrenciesDTO[];
  userRegistrationForm: FormGroup;

  emailPattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(
    private userService: UserService,
    private resourcesService: ResourcesService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // load currencies
    this.resourcesService.loadCurrencies().subscribe(
      res => {
        this.setCurrencies(res);
      }
    );

    // this.resetForm();
    this.user.Email = 'bleonardo2@alter-solutions.com';
    this.user.Username = 'bleonardo';
    this.user.FirstName = 'asd';
    this.user.LastName = 'adas';
    this.user.Password = '123';
    this.user.PasswordConfirmation = '123';
  }

  resetForm(form?: NgForm): void {
    if (form != null) {
      this.user = new UsersDTO();
    }
  }

  onSubmitForm(form: NgForm): void {
    this.user = <UsersDTO>form.value;
    this.user.Wallet = new WalletsDTO(this.walletAmount);
    this.user.Wallet.Currency = new CurrenciesDTO(this.currencyId);
    this.userService.registerUser(this.user)
      .subscribe((data: ResponseDto<UsersDTO>) => {
        if (data.Status = true) {
          this.resetForm(form);
          this.toastr.success(data.Message);
          localStorage.setItem('jwtToken', data.AccessToken);
          localStorage.setItem('username', data.Data.FirstName + '' + data.Data.LastName);
          localStorage.setItem('userId', data.Data.UserId.toString());
          this.userService.setLoggedInState(true);
          this.userService.setUserName(data.Data.FirstName + '' + data.Data.LastName);
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.error(data.Message);
        }
      });
  }

  setCurrencies(arg0: CurrenciesDTO[]): void {
    this.currencies = arg0;
  }

  setCurrencyId(value: number): void {
    this.currencyId = value;
  }

  bindToWallet(value: number): void {
    this.walletAmount = value;
  }

  get walletAmountInput() { return this.userRegistrationForm.get('walletAmount'); }

}
