import { Component, OnInit, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Sets } from '../models/sets.model';
import { Location } from '@angular/common';

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
  currentMode: string;
  role: string = 'student';
  constructor(private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private location: Location) {
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
    if (this.currentSetName && this.currentGroupName && this.firstName && this.lastName) {
      // this.chatService.login(this.currentSetName, this.currentGroupName, this.firstName, this.lastName)
      console.log("logged in");
    }
    this.getAllUsers();
    setTimeout(this.scrollSmoothToBottom, 500);
  }

  ngOnDestroy() {
    this.chatService.logOut();
    console.log("logged out")
  }

  getCurrentSet() {
    this.adminService.getSet(this.currentSetName).subscribe(sets => {
      this.currentSet = sets;
      this.onAnswerWindow = sets.answerWindow;
      this.onAlertTA = sets.alertTA;
      this.currentMode = sets.mode;
    })
  }

  logOut() {
    this.chatService.logOut().then(() => {
      // this.router.navigate(['/login-chat'])
      this.location.back();
    })
  }

  setCurrentUser() {
    this.chatService.setCurrentUser(this.firstName, this.lastName, this.role);
  }

  getAllUsers() {
    this.users = this.chatService.getAllUsers(this.currentSetName, this.currentGroupName);
    var currentUserArray;
    this.chatService.getAllUsers(this.currentSetName, this.currentGroupName).subscribe(user => {
      if (currentUserArray == null) {
        user.sort();
        currentUserArray = user;
        console.log("Current Array: ", currentUserArray, currentUserArray.length);
        console.log("User Array: ", user.length);
      }
      else if (currentUserArray != user) {
        console.log("not equal")
        console.log("Current Array: ", currentUserArray, currentUserArray.length);
        console.log("User Array: ", user, user.length);

        for (var i = 0; i < user.length; i++) {
          var num = 0;
          for (var j = 0; j < currentUserArray.length; j++) {
            if(num ==1 ){
              break;
            }
            if (user[i] == currentUserArray[j]) {
              num = 1;

            }


          }
          if (num == 0) {
            if (user.length > currentUserArray.length) {
              var tag = document.createElement("p");
              var text = document.createTextNode("Someone has joined the chat.");
              tag.appendChild(text);
              var element = document.getElementById("groupOff");
              element.appendChild(tag);
              console.log("Someone has joined the chat.")
              num = 1
              currentUserArray = user;
              break;
            } else {
              var tag = document.createElement("p");
              var text = document.createTextNode("Someone has left the chat.");
              tag.appendChild(text);
              var element = document.getElementById("groupOff");
              element.appendChild(tag);
              console.log("Someone has left the chat.")
              num =1;
              currentUserArray = user;
              break;
            }

          }
          currentUserArray = user;
          break;

        }



        currentUserArray = user;
        console.log("Current Array: ", currentUserArray, currentUserArray.length);
        console.log("User Array: ", user, user.length);
      }
      console.log(user.length)

    });

  }

  onKey(event: any) {
    if (this.message != "" && this.message != null) {
      this.chatService.updateMessage(this.currentSetName, this.currentGroupName, event.target.value).then(() => {
        setTimeout(this.scrollSmoothToBottom, 100);

      })
    }
  }

  getAllMessages() {
    this.messages = this.chatService.getAllMessages(this.currentSetName, this.currentGroupName);
  }

  sendMessage() {

    if (this.message != "" && this.message != null) {
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
