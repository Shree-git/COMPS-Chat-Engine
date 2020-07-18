import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sets } from '../models/sets.model';
import { AdminService } from '../services/admin.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sets: Observable<Sets[]>
  totalSets: number
  constructor(private adminService: AdminService,
              private chatService: ChatService) { }

  ngOnInit(): void {
    this.sets = this.adminService.getAllSets();

  }

  getUsers(setName, groupName){
    return this.chatService.getAllUsers(setName, groupName);
  }

}
