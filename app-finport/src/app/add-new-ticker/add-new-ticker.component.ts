import { Component, OnInit, Input } from '@angular/core';
import { DtoTicker } from '../models/ticker';
import { TickerService} from '../services/ticker.service';

@Component({
  selector: 'app-add-new-ticker',
  templateUrl: './add-new-ticker.component.html',
  styleUrls: ['./add-new-ticker.component.css']
})
export class AddNewTickerComponent implements OnInit {

  constructor(private tickerService: TickerService) { }

  ticker: DtoTicker = this.tickerService.ticker;

  ngOnInit() {
  }
}
