import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map } from 'rxjs/operators';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User
  currentSet
  currentGroup
  users: Observable<User[]>
  currentMessageId:string = this.afs.createId();
  newMessage: Message
  updatedMessage: Message
  constructor(private afs: AngularFirestore) { }

  login(fName, lName, role, set, group){
    this.currentUser = {
      firstName: fName,
      lastName: lName,
      role: role
    }
    this.currentSet = set;
    this.currentGroup = group;
    return this.afs.collection('sets').doc(set).collection('groups')
      .doc(group).collection('users').doc(this.currentUser.firstName + ' ' + this.currentUser.lastName)
      .set(this.currentUser);
  }

  setCurrentUser(fName, lName, role){
    this.currentUser = {
      firstName: fName,
      lastName: lName,
      role: role
    }
  }

  sendMessage(currentSet, currentGroup, message: string){

    return this.afs.collection('sets').doc(currentSet).collection('groups')
      .doc(currentGroup).collection('messages').doc(this.currentMessageId.toString()).update({
        message: message
      }).then(()=>{
        this.currentMessageId = this.afs.createId();
      })
  }

  logOut(){
    return this.afs.collection('sets').doc(this.currentSet).collection('groups')
    .doc(this.currentGroup).collection('users').doc(this.currentUser.firstName + ' ' + this.currentUser.lastName)
    .delete();
  }

  updateMessage(currentSet, currentGroup, message: string){
    this.updatedMessage = {
      message: message,
      updatedAt: new Date().toISOString(),
    }

    this.newMessage = {
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      message: message,
      createdAt: new Date().toISOString(),
    }

    return this.afs.collection('sets').doc(currentSet).collection('groups')
      .doc(currentGroup).collection('messages').doc(this.currentMessageId).update(this.updatedMessage).catch(err=>{
        return this.afs.collection('sets').doc(currentSet).collection('groups')
        .doc(currentGroup).collection('messages').doc(this.currentMessageId).set(this.newMessage);
      });
  }

  getAllUsers(currentSet, currentGroup): Observable<User[]>{
    this.currentSet = currentSet;
    this.currentGroup = currentGroup;
    this.users = this.afs.collection('sets').doc(currentSet).collection('groups')
    .doc(currentGroup).collection('users').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;

        return { id, ...data }
      })
    }))
    return this.users;
  }

  getAllMessages(currentSet, currentGroup): Observable<Message[]>{
    this.currentSet = currentSet;
    this.currentGroup = currentGroup
    return this.afs.collection('sets').doc(currentSet).collection('groups')
    .doc(currentGroup).collection('messages', ref => ref.orderBy('createdAt', 'asc')).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Message;
        const id = a.payload.doc.id;
        return { id, ...data }
      })
    }))

  }
}
