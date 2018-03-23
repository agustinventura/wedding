import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterializeModule } from 'angular2-materialize';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FirebaseAuthenticationService } from './services/firebase-authentication.service';
import { FirebaseAuthorizationService } from './services/firebase-authorization.service';

import { NavbarComponent } from './components/common/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { WhereComponent } from './components/where/where.component';
import { DresscodeComponent } from './components/dresscode/dresscode.component';
import { GiftComponent } from './components/gift/gift.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LoginComponent } from './components/login/login.component';
import { AuthguardService } from './services/authguard.service';
import { LoginService } from './services/login.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    WhereComponent,
    DresscodeComponent,
    GiftComponent,
    ConfirmComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [ FirebaseAuthenticationService, AuthguardService, FirebaseAuthorizationService, LoginService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
