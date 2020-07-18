import { Component, OnInit, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Sets } from '../models/sets.model';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterContentInit, OnDestroy {
  message: string;
  users: Observable<User[]>
  messages: Observable<Message[]>
  currentSet: Sets;
  currentSetName: string;
  currentGroupName: string;
  onAnswerWindow: boolean;
  onAlertTA: boolean;
  firstName: string;
  lastName: string;
  role: string = 'student';
  constructor(private chatService: ChatService,
              private activatedRoute: ActivatedRoute,
              private adminService: AdminService,
              private router: Router) {
    this.currentSetName = this.activatedRoute.snapshot.paramMap.get('set')
    this.currentGroupName = this.activatedRoute.snapshot.paramMap.get('group')
    this.firstName = this.activatedRoute.snapshot.paramMap.get('firstName')
    this.lastName = this.activatedRoute.snapshot.paramMap.get('lastName')
  }

  ngOnInit(): void {

    this.getAllMessages();
    this.getCurrentSet();
    setTimeout(this.scrollSmoothToBottom, 100);
    this.getAllUsers();
  }

  ngAfterContentInit() {

    this.getAllMessages();

    this.getCurrentSet();
    this.setCurrentUser();
    if(this.currentSetName && this.currentGroupName && this.firstName && this.lastName){
      // this.chatService.login(this.currentSetName, this.currentGroupName, this.firstName, this.lastName)
      console.log("logged in");
    }
    this.getAllUsers();
    setTimeout(this.scrollSmoothToBottom, 500);
  }

  ngOnDestroy(){
    this.chatService.logOut();
    console.log("logged out")
  }

  getCurrentSet(){
    this.adminService.getSet(this.currentSetName).subscribe(sets=>{
      this.currentSet = sets;
      this.onAnswerWindow = sets.answerWindow;
      this.onAlertTA = sets.alertTA;
    })
  }

  logOut(){
    this.chatService.logOut().then(()=>{
      this.router.navigate(['/login-chat'])
    })
  }

  setCurrentUser(){
    this.chatService.setCurrentUser(this.firstName, this.lastName, this.role);
  }

  getAllUsers() {
    this.users = this.chatService.getAllUsers(this.currentSetName, this.currentGroupName);
    this.chatService.getAllUsers(this.currentSetName, this.currentGroupName).subscribe(user=>{
      console.log(user)
    });

  }

  onKey(event: any) {
    if(this.message != "" && this.message != null){
    this.chatService.updateMessage(this.currentSetName, this.currentGroupName, event.target.value).then(()=>{
      setTimeout(this.scrollSmoothToBottom, 100);

    })
  }
  }

  getAllMessages() {
    this.messages = this.chatService.getAllMessages(this.currentSetName, this.currentGroupName);
  }

  sendMessage() {

    if(this.message != "" && this.message != null){
      console.log(this.message)
      this.chatService.sendMessage(this.currentSetName, this.currentGroupName, this.message);
      this.message = "";
    }
  }

  scrollSmoothToBottom() {
    var div = document.getElementById('groupOff');
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }
}
