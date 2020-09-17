import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Observable } from 'rxjs';
import { Sets } from '../models/sets.model';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-monitor',
  templateUrl: './admin-monitor.component.html',
  styleUrls: ['./admin-monitor.component.css']
})

export class AdminMonitorComponent implements OnInit {
  sets: Observable<Sets[]>
  groups: Observable<{groupNumber}[]>
  firstName: string;
  lastName: string;
  selectedSet: string;
  selectedGroup: string;
  role="ta"
  assignedSets;
  constructor(private adminService: AdminService, private chatService: ChatService,
    private router: Router) { }

  ngOnInit(): void {
    this.sets = this.adminService.getAllSets();
    this.assignedSets = this.adminService.getAdminMonitorSets();
  }

  login(){
    this.chatService.login(this.firstName, this.lastName, this.role, this.selectedSet, this.selectedGroup).then(()=>{
      this.router.navigate(['/chat/', this.selectedSet, this.selectedGroup, this.firstName, this.lastName])
    });
  }

  onSetSelected(value: string){
    console.log(value + " set is selected. Alias: ");
    this.selectedSet = value
    this.groups = this.adminService.getGroups(value);
  }

  onGroupSelected(value: string){
    this.selectedGroup = value
    console.log(value + " group is selected. Alias: ");
  }


}
