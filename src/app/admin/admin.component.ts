import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Sets } from '../models/sets.model';
import { Observable } from 'rxjs';
import { GsapService } from '../services/gsap.service';


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
  constructor(private adminService: AdminService, private gsapService: GsapService) { }

  ngOnInit(): void {
    this.getAllSets();
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
      alertTA: this.showAlertTA
    }
    this.adminService.createSet(this.newSet, this.setName).then(()=>{
      console.log("Set Created");
    })
  }

  getAllSets(){
    this.sets = this.adminService.getAllSets();
  }

  closeSet(setName: string){
    this.adminService.deleteSet(setName);
  }

}
