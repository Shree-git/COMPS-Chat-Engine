import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Sets } from '../models/sets.model';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  sets: Observable<Sets[]>
  constructor(private afs: AngularFirestore) {

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




}
