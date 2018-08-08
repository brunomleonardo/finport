import { Component, OnInit, Input } from '@angular/core';
import { DtoProduct } from '../models/product';
import { ProductService } from '../services/product.service';
import { NgForm } from '@angular/forms';
import { DtoOperationHistory } from '../models/operationHistory';
import { ResponseDto } from '../models/response';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-ticker',
  templateUrl: './add-new-ticker.component.html',
  styleUrls: ['./add-new-ticker.component.css']
})
export class AddNewTickerComponent implements OnInit {

  constructor(
    private ProductService: ProductService,
    private router: Router,
    private toastr: ToastrService) { }

  @Input()
  ticker: DtoProduct;

  operationHistory: DtoOperationHistory;

  ngOnInit() {
    this.operationHistory = new DtoOperationHistory();
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
    this.ProductService.addTicker(form.value, this.ticker.id)
      .subscribe(
        (data: ResponseDto<any>) => {
          if (data.Status) {
            this.toastr.success(data.Message, "Operation", {
              timeOut: 1500
            });
          } else {
            this.toastr.error(data.Message, "Operation", {
              timeOut: 1500,
            });
          }
          this.ticker = null;
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
