import { Component, OnInit } from '@angular/core';
import { DtoWallet } from '../models/wallet';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  myWallet: DtoWallet;

  constructor(
    private walletService: WalletService
  ) { }

  ngOnInit() {
    this.walletService.getUserWallet().subscribe(
      (data: DtoWallet) => {
        this.setWallet(data);
      });
    // this.walletService.userWallet$.subscribe((value) => this.setWallet(value));
  }

  setWallet(value: DtoWallet): void {
    console.log(value);
    this.myWallet = value;
  }

}
