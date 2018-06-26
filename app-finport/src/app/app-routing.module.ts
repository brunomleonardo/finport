import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchTickerComponent } from './search-ticker/search-ticker.component';
import { NewsComponent } from './news/news.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'newticker', component: SearchTickerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'news', component: NewsComponent },
  { path: 'registeruser', component: SignUpComponent },
  { path: 'signin', component: SignInComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
