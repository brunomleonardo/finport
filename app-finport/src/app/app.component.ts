import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, animate, style, transition, state } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  isLoggedIn: boolean;
  showSignInVal: boolean = true;
  showSignUpVal: boolean;
  title = 'finport-app';
  showFormSignIn: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('jwtToken') != null;
    if(this.isLoggedIn){
      this.router.navigate(['/dashboard']);
    }
  }

  toggleShow(): void {
    this.showFormSignIn = !this.showFormSignIn;
  }

  showSignIn(): void {
    this.showSignInVal = true;
    this.showSignUpVal = false;
  }

  showSignUp(): void {
    this.showSignInVal = false;
    this.showSignUpVal = true;
  }

}
