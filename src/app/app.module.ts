import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AgmCoreModule } from '@agm/core';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FirebaseAuthenticationService } from './services/firebase-authentication.service';
import { FirebaseAuthorizationService } from './services/firebase-authorization.service';
import { FirestoreUserService } from './services/firestore-user.service';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { WhereComponent } from './components/where/where.component';
import { HowComponent } from './components/how/how.component';
import { GiftComponent } from './components/gift/gift.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LoginComponent } from './components/login/login.component';
import { AuthguardService } from './services/authguard.service';
import { LoginService } from './services/login.service';
import { LogoutComponent } from './components/logout/logout.component';
import { UserComponent } from './components/user/user.component';
import { AcknowledgeComponent } from './components/acknowledge/acknowledge.component';
import { FirestoreSongService } from './services/firestore-song.service';
import { AdminComponent } from './components/admin/admin.component';
import { WindowService } from './services/window.service';
import { EmailLoginComponent } from './components/email-login/email-login.component';
import { UserDisabledComponent } from './components/user-disabled/user-disabled.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { BooleanPipe } from './pipes/boolean.pipe';
import { SongsComponent } from './components/songs/songs.component';
import { AnimableComponent } from './components/common/animable/animable.component';
import { FlyingListComponent } from './components/common/flying-list/flying-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    WhereComponent,
    HowComponent,
    GiftComponent,
    ConfirmComponent,
    LoginComponent,
    LogoutComponent,
    UserComponent,
    AcknowledgeComponent,
    AdminComponent,
    EmailLoginComponent,
    UserDisabledComponent,
    UserFormComponent,
    BooleanPipe,
    SongsComponent,
    AnimableComponent,
    FlyingListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
    AngularFireModule.initializeApp(
      environment.firebase,
      'angular-auth-firebase'
    ),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBuMpweBfYNw9aR3SWTzEX770d945GnFE0'
    })
  ],
  providers: [
    FirebaseAuthenticationService,
    AuthguardService,
    FirebaseAuthorizationService,
    LoginService,
    FirestoreUserService,
    FirestoreSongService,
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
