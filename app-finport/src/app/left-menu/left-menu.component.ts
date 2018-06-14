import { Component, OnInit } from '@angular/core';
import { DtoUser } from '../models/user';
import { TickerService } from '../services/ticker.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})

export class LeftMenuComponent implements OnInit {

  private dtoUser: DtoUser = {
    id: 13,
    name: 'Miguel Oliveira',
    strategy: 'Part-T Trader'
  };

  constructor(private tickerService: TickerService) { }

  ngOnInit() {
  }

  loadTickers(): void {
    console.log("component");
    this.tickerService.loadTickers();
  }
}
