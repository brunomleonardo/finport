import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { LocalStorageModule } from 'angular-2-local-storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { Route, Router } from '@angular/router';

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
    SignInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    ToastrModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'finport',
      storageType: 'localStorage'
    })
  ],
  providers: [
    CookieService],
  // { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }],
  bootstrap: [AppComponent]
})
export class AppModule {}
export function getLocalStorage() {
  return (typeof window !== "undefined") ? window.localStorage : null;
}