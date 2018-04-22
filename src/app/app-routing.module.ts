import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthguardService } from './services/authguard.service';
import { HomeComponent } from './components/home/home.component';
import { WhereComponent } from './components/where/where.component';
import { DresscodeComponent } from './components/dresscode/dresscode.component';
import { GiftComponent } from './components/gift/gift.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserComponent } from './components/user/user.component';
import { AcknowledgeComponent } from './acknowledge/acknowledge.component';
import { AdminComponent } from './components/admin/admin.component';
import { PhoneLoginComponent } from './components/phone-login/phone-login.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'where', component: WhereComponent },
  { path: 'dresscode', component: DresscodeComponent },
  { path: 'gift', component: GiftComponent },
  {
    path: 'confirm',
    component: ConfirmComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'acknowledge',
    component: AcknowledgeComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthguardService]
  },
  { path: 'login', component: LoginComponent },
  { path: 'phone-login', component: PhoneLoginComponent },
  { path: 'logout/:name', component: LogoutComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
