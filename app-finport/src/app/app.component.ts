import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, animate, style, transition, state } from '@angular/animations';
import { Observable } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  isLoggedIn: boolean;
  title = 'finport-app';
  showFormSignIn: boolean;
  loaderObsr: Observable<boolean>;
  loading: boolean;

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('jwtToken') != null;
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
    this.loaderService.loaderValue$.subscribe((value) => this.setLoaderVisibility(value));
    this.userService.loggedIn$.subscribe((value) => this.setLoggedInValue(value));
  }
  setLoaderVisibility(value: boolean): void {
    this.loading = value;
  }
  setLoggedInValue(value: boolean): void {
    this.loading = value;
  }

}
