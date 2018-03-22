import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { WhereComponent } from './components/where/where.component';
import { DresscodeComponent } from './components/dresscode/dresscode.component';
import { GiftComponent } from './components/gift/gift.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'where', component: WhereComponent },
  { path: 'dresscode', component: DresscodeComponent },
  { path: 'gift', component: GiftComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
