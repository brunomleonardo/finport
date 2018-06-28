import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchTickerComponent } from './search-ticker/search-ticker.component';
import { NewsComponent } from './news/news.component';
import { AppComponent } from './app.component';

const routes = [
  { path: '', redirectTo: '/init', pathMatch: 'full' },
  { path: 'newticker', component: SearchTickerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'news', component: NewsComponent },
  { path: 'init', component: AppComponent },
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
