import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { LoginChatComponent } from './login-chat/login-chat.component';
import { ChatComponent } from './chat/chat.component';
import { AdminMonitorComponent } from './admin-monitor/admin-monitor.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'admin'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'login-chat', component: LoginChatComponent},
  {path: 'chat/:set/:group/:firstName/:lastName', component: ChatComponent},
  {path: 'admin-monitor', component: AdminMonitorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
