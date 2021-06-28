import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { firebaseConfig } from './firebase'
import { FormsModule } from '@angular/forms';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginChatComponent } from './login-chat/login-chat.component';
import { ChatComponent } from './chat/chat.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminMonitorComponent } from './admin-monitor/admin-monitor.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './admin-login/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    AdminComponent,
    LoginChatComponent,
    ChatComponent,
    AdminMonitorComponent,
    AdminLoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    // FormBuilder,
    // FormGroup,
    // Validators
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
