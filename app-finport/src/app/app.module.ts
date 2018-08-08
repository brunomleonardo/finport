import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { LocalStorageModule } from 'angular-2-local-storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { AddNewTickerComponent } from './add-new-ticker/add-new-ticker.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { SearchTickerComponent } from './search-ticker/search-ticker.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NewsComponent } from './news/news.component';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EmailValidatorComponent } from './custom-validators/email-validator/email-validator.component';
import { SignInComponent } from './sign-in/sign-in.component';
// import { MaterialModule } from '@angular/material';
import { LoadingModule } from 'ngx-loading';
import { WalletComponent } from './wallet/wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LeftMenuComponent,
    AddNewTickerComponent,
    DashboardComponent,
    SearchTickerComponent,
    NewsComponent,
    FeedCardComponent,
    SignUpComponent,
    EmailValidatorComponent,
    SignInComponent,
    WalletComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-center-center',
      preventDuplicates: true,
    }),
    LocalStorageModule.withConfig({
      prefix: 'finport',
      storageType: 'localStorage'
    }),
    LoadingModule
  ],
  providers: [
    CookieService],
  // { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getLocalStorage() {
  return (typeof window !== "undefined") ? window.localStorage : null;
}