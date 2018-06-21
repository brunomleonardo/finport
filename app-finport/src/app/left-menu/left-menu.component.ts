import { Component, OnInit } from '@angular/core';
import { DtoUser } from '../models/user';
import { TickerService } from '../services/ticker.service';
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
    private tickerService: TickerService,
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
  }

  setUserName(name: String) {
    this.userName = name;
  }

  loadTickers(): void {
    this.tickerService.loadTickers();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
