import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Sets } from '../models/sets.model';
import { Observable } from 'rxjs';
import { GsapService } from '../services/gsap.service';
import { Account } from '../models/account.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  groupOffset: number = 10;
  groups: number = 1;
  setName: string;
  numQuestions: number = 1;
  showAnswerWindow: boolean = true;
  showAlertTA: boolean = true;
  newSet: Sets;
  sets: Observable<Sets[]>
  selectedMode: string;
  selectedTA: string;
  TAs: Observable<Account[]>;
  selectedSet: string;
  selectedGroup: string;
  selectedGroups: string[];
  groups1: Observable<{groupNumber}[]>
  constructor(private adminService: AdminService, private gsapService: GsapService) { }

  ngOnInit(): void {
    this.getAllSets();
    this.getAllTAs();
    // const tl = new TimelineMax();
    this.gsapService.fFadeFrom('.mainBody', 1, 0, 1, 0, -50);
  }



  createSet(){
    this.newSet = {
      groupOffset: this.groupOffset,
      groups: this.groups,
      name: this.setName,
      numQuestions: this.numQuestions,
      answerWindow: this.showAnswerWindow,
      alertTA: this.showAlertTA,
      mode: this.selectedMode
    }
    this.adminService.createSet(this.newSet, this.setName).then(()=>{
      console.log("Set Created");
    })
  }

  getAllSets(){
    this.sets = this.adminService.getAllSets();
  }

  getAllTAs(){
    this.TAs = this.adminService.getAllTAs();
  }

  closeSet(setName: string){
    this.adminService.deleteSet(setName);
  }

  modeChange(e){
    // console.log(e)
    this.selectedMode = e.value;
  }

  onTASelected(value: string){
    console.log(value + " TA is selected.");
    this.selectedTA = value;
  }

  onSetSelected(value: string){
    console.log(value + " set is selected");
    this.selectedSet = value
    this.groups1 = this.adminService.getGroups(value);
  }

  onGroupSelected(value: string){
    this.selectedGroup = value
    console.log(value + " group is selected.");
  }

  groupsSelect(e){
    // console.log(e);
    this.selectedGroups = e.value
    console.log(this.selectedGroups);
  }

  assignTA(){
    this.adminService.assignTA(this.selectedTA, this.selectedSet, this.selectedGroups);
  }
}
