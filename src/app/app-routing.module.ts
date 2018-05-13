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
import { AcknowledgeComponent } from './components/acknowledge/acknowledge.component';
import { AdminComponent } from './components/admin/admin.component';
import { EmailLoginComponent } from './components/email-login/email-login.component';
import { UserDisabledComponent } from './components/user-disabled/user-disabled.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SongsComponent } from './components/songs/songs.component';

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
  {
    path: 'songs',
    component: SongsComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'user-form',
    component: UserFormComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'user-form/:id',
    component: UserFormComponent,
    canActivate: [AuthguardService]
  },
  { path: 'login', component: LoginComponent },
  { path: 'email-login', component: EmailLoginComponent },
  { path: 'user-disabled', component: UserDisabledComponent },
  { path: 'logout/:name', component: LogoutComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
