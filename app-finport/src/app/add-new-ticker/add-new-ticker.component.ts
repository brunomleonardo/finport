import { Component, OnInit, Input } from '@angular/core';
import { DtoTicker } from '../models/ticker';
import { TickerService } from '../services/ticker.service';
import { NgForm } from '@angular/forms';
import { DtoOperationHistory } from '../models/operationHistory';
import { ResponseDto } from '../models/response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-ticker',
  templateUrl: './add-new-ticker.component.html',
  styleUrls: ['./add-new-ticker.component.css']
})
export class AddNewTickerComponent implements OnInit {

  constructor(
    private tickerService: TickerService,
    private toastr: ToastrService) { }

  @Input()
  ticker: DtoTicker;

  operationHistory: DtoOperationHistory;

  ngOnInit() {
    this.operationHistory = new DtoOperationHistory();
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
    this.tickerService.addTicker(form.value, this.ticker._id)
      .subscribe(
        (data: ResponseDto) => {
          if (data.success) {
            this.toastr.success(data.msg);
          } else {
            this.toastr.error(data.msg);
          }
        }
      );
  }

  updateTotals(): void {
    this.operationHistory.totalConverted
      = (this.operationHistory.amount * this.operationHistory.buyPrice) * this.operationHistory.conversionUSD;
    this.operationHistory.total
      = (this.operationHistory.amount * this.operationHistory.buyPrice);
  }
}
