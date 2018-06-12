import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewTickerComponent } from './add-new-ticker/add-new-ticker.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'newticker', component: AddNewTickerComponent },
  { path: 'dashboard', component: DashboardComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
