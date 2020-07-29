import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Account } from 'src/app/models/account.model';
import { map, take } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  id: string
  firstName: string
  lastName: string
  email: string
  account: Account = {
    id: '',
    fName: '',
    lName: '',
    role: '',
  }
  items: any
  constructor(private authService: AuthenticationService, private afStore: AngularFirestore,
     private location: Location) {
       if(this.authService.isLoggedIn){
     this.afStore.collection('accounts').doc<Account>
   (this.authService.user.uid).
   valueChanges().pipe(
     take(1),
     map(account=>{
       account.id = this.authService.user.uid;
       return account
     })
   ).subscribe(account=>{
     this.account = account

   })
  }

     }

     createAccount(account){
      this.afStore.collection('accounts').doc<Account>(this.authService.user.uid).set({
        fName: account.fName,
        lName: account.lName,
        role: account.role
      }).then((

      ) =>{
       this.account = {
         id: this.authService.user.uid,
         fName: account.fName,
         lName: account.lName,
         role: account.role
       }
       // this.location.back()
      })

     }

  updateAccount(account){


    this.afStore.collection('accounts').doc<Account>(this.authService.user.uid).update({
       fName: account.fName,
       lName: account.lName,

     }).then((

     ) =>{
      this.account = {
        id: this.authService.user.uid,
        fName: account.fName,
        lName: account.lName,
        role: account.role
      }
      // this.location.back()
     })

}



getAccount(): Account{

   this.afStore.collection('accounts').doc<Account>
   (this.authService.user.uid).
   valueChanges().pipe(
     take(1),
     map(account=>{
       account.id = this.authService.user.uid;
       return account
     })
   ).subscribe(account=>{
     this.account = account
   })
   return this.account

}
}


