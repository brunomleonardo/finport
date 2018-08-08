import { Component, OnInit } from '@angular/core';
import { WalletsDTO } from '../models/wallet';
import { WalletService } from '../services/wallet.service';
import { ResponseDto } from '../models/response';
import { DtoOperationHistory } from '../models/operationHistory';
import { Observable } from 'rxjs';
import { OperationsService } from '../services/operations.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  myWallet: WalletsDTO;
  totalFees: number = 0;
  totalZeroLoss: number;
  userOperations: DtoOperationHistory[];

  constructor(
    private walletService: WalletService,
    private operationsService: OperationsService
  ) { }

  ngOnInit() {
    this.walletService.getUserWallet().subscribe(
      (data: ResponseDto<WalletsDTO>) => {
        this.setWallet(data.Data);
      });
    this.walletService.userWallet$.subscribe((value) => this.setWallet(value));
    this.operationsService.getUserOperations().subscribe(
      (res: ResponseDto<DtoOperationHistory[]>) => {
        this.userOperations = res.Data;
        if (this.userOperations && this.userOperations.length > 0) {
          this.userOperations.forEach(item => {
            this.totalFees += item.feeValue;
          });
        }
      }
    );
  }

  setWallet(value: WalletsDTO): void {
    this.myWallet = value;
    let total = 0;
    if (this.myWallet && this.myWallet.WalletDeposits) {
      this.myWallet.WalletDeposits.forEach(dep => {
        total += dep.Amount;
      });
      //this.myWallet.totalAccount = this.myWallet.amount + total;
      //this.totalZeroLoss = this.myWallet.totalAccount + (2 * this.totalFees); // + anual fees
    }
  }
}
