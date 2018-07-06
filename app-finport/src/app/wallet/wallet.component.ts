import { Component, OnInit } from '@angular/core';
import { DtoWallet } from '../models/wallet';
import { WalletService } from '../services/wallet.service';
import { ResponseDto } from '../models/response';
import { DtoUser } from '../models/user';
import { DtoOperationHistory } from '../models/operationHistory';
import { Observable } from 'rxjs';
import { OperationsService } from '../services/operations.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  myWallet: DtoWallet;
  totalFees: number = 0;
  totalZeroLoss: number;
  userOperations: DtoOperationHistory[];

  constructor(
    private walletService: WalletService,
    private operationsService: OperationsService
  ) { }

  ngOnInit() {
    this.walletService.getUserWallet().subscribe(
      (data: ResponseDto<DtoWallet>) => {
        this.setWallet(data.data);
      });
    this.walletService.userWallet$.subscribe((value) => this.setWallet(value));
    this.operationsService.getUserOperations().subscribe(
      (res: ResponseDto<DtoOperationHistory[]>) => {
        this.userOperations = res.data;
        if (this.userOperations && this.userOperations.length > 0) {
          this.userOperations.forEach(item => {
            this.totalFees += item.feeValue;
          });
        }
      }
    );
  }

  setWallet(value: DtoWallet): void {
    this.myWallet = value;
    let total = 0;
    if (this.myWallet && this.myWallet.deposits) {
      this.myWallet.deposits.forEach(dep => {
        total += dep.amount;
      });
      this.myWallet.totalAccount = this.myWallet.amount + total;
      this.totalZeroLoss = this.myWallet.totalAccount + (2 * this.totalFees); // + anual fees
    }
  }
}
