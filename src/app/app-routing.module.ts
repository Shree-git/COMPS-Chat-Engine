import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { LoginChatComponent } from './login-chat/login-chat.component';
import { ChatComponent } from './chat/chat.component';
import { AdminMonitorComponent } from './admin-monitor/admin-monitor.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RegisterComponent } from './admin-login/register/register.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'admin-login'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'login-chat', component: LoginChatComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'chat/:set/:group/:firstName/:lastName', component: ChatComponent},
  {path: 'admin-monitor', component: AdminMonitorComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
