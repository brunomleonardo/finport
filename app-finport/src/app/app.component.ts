import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, animate, style, transition, state } from '@angular/animations';
import { Observable } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { UserService } from './services/user.service';
import { ServicesModule } from './services/services.module';

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
    private serviceModule: ServicesModule,
    private userService: UserService) {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    const userId = this.serviceModule.getUserId();
    if (userId)
      localStorage.clear();

    this.isLoggedIn = localStorage.getItem('userId') != null;
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/init']);
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

  toggleShow(): void {
    this.showFormSignIn = !this.showFormSignIn;
  }

}
