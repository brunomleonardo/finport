import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})

export class LeftMenuComponent implements OnInit {

  loggedIn$: Observable<boolean>;
  loggedIn: boolean;
  userName$: Observable<String>;
  userName: String;

  constructor(
    private ProductService: ProductService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.loggedIn$.subscribe(state => this.setValueState(state));
    this.userService.userName$.subscribe(name => this.setUserName(name));
    this.loggedIn = localStorage.getItem('jwtToken') != null;
    this.userName = localStorage.getItem('username');
  }

  setValueState(state: boolean) {
    this.loggedIn = state;
    console.log(state);
  }

  setUserName(name: String) {
    this.userName = name;
  }

  loadTickers(): void {
    this.ProductService.loadTickers();
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/']);
  }

}
