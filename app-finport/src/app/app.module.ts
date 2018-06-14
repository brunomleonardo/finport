import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { AddNewTickerComponent } from './add-new-ticker/add-new-ticker.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { SearchTickerComponent } from './search-ticker/search-ticker.component';
import { InfiniteScrollModule  } from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LeftMenuComponent,
    AddNewTickerComponent,
    DashboardComponent,
    SearchTickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
