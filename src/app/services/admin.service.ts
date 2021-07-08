import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Sets } from '../models/sets.model';
import { Account } from '../models/account.model';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  sets: Observable<Sets[]>
  constructor(private afs: AngularFirestore, private authService: AuthenticationService) {

  }

  createSet(newSet: Sets, setName: string) {
    return this.afs.collection('sets').doc(setName).set(newSet).then(() => {
      for (let index = newSet.groupOffset+1; index <= newSet.groupOffset + newSet.groups; index++) {
        this.afs.collection('sets').doc(setName).collection('groups').doc(index.toString()).set({
          groupNumber: index
        })
      }
    });
  }

  deleteSet(setName: string) {
    return this.afs.collection('sets').doc(setName).delete();
  }

  getAllSets(): Observable<Sets[]> {
    this.sets = this.afs.collection('sets').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Sets;
        const id = a.payload.doc.id;
        return { id, ...data }
      })
    }))
    return this.sets;
  }


  getAllTAs(): Observable<Account[]> {
    return this.afs.collection('accounts', ref=> ref.where('role', '==', 'TA')).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Account;
        const id = a.payload.doc.id;
        return { id, ...data }
      })
    }))

  }



  getGroups(setName): Observable<{groupNumber}[]>{
    return this.afs.collection('sets').doc<Sets>(setName).collection('groups').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as {groupNumber};
        const id = a.payload.doc.id;
        return { id, ...data }
      })
    }))
  }

  getSet(setName: string): Observable<Sets> {
    return this.afs.collection('sets').doc<Sets>(setName).valueChanges().pipe(
      take(1),
      map(set => {
        set.name = setName;
        return set;
      })
    )
  }

  assignTA(TA, set, groups){
    return this.afs.collection('accounts').doc(TA).update({
      assignedSets: firestore.FieldValue.arrayUnion({
        set: set,
        groups: groups
      })
    })
  }

  getAdminMonitorSets(){
    return this.afs.collection('accounts').doc<Account>(this.authService.user.uid).valueChanges().pipe(
      take(1),
      map(account => {
        return account.assignedSets;
      })
    )
  }

  adminMonitorSets(){

  }

}
