import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AdminUser as User} from '../models/adminUser.model';
import { Router } from '@angular/router';
import { app } from 'firebase';
import { Observable, of } from 'rxjs';
// import { switchMap } from 'rxjs/operators'
// import { Observable } from 'rxjs/Observable';
import { switchMap, take, map } from 'rxjs/operators';
import { Account } from '../models/account.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // userData: any
  user: User
  usersRef
  account: Account = {
    id: '',
    fName: '',
    lName: '',
    role: '',
  }
  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,

    ) {
      // this.getUserInfo()
      // this.usersRef = this.afStore.collection('users')
      // this.usersRef = this.usersRef.where('uid','==', this.user.uid)
      this.user = JSON.parse(localStorage.getItem('user'))
      this.afAuth.onAuthStateChanged((user)=>{
        // if (user){
        //   console.log(user.uid)
        //   this.user = user
        //   localStorage.setItem('user', JSON.stringify(this.user))
        //   JSON.parse(localStorage.getItem('user'))
        //   // this.user = {
        //   //   uid: user.uid,
        //   //   email: user.email,
        //   //   photoURL: user.photoURL
        //   // }
        // }else{
        //   this.user = null
        //   localStorage.setItem('user', null)
        //   JSON.parse(localStorage.getItem('user'))
        // }


          if (user) {
            this.user = user
            localStorage.setItem('user', JSON.stringify(this.user))
            JSON.parse(localStorage.getItem('user'))

          }else{
            this.user = null
            localStorage.setItem('user', null)
            this.user = JSON.parse(localStorage.getItem('user'))
          }
        })


      // this.afAuth.authState.subscribe(user => {
      //   if (user) {
      //     this.user = user
      //     localStorage.setItem('user', JSON.stringify(this.user))
      //     JSON.parse(localStorage.getItem('user'))
      //   }else{
      //     this.user = null
      //     localStorage.setItem('user', null)
      //     JSON.parse(localStorage.getItem('user'))
      //   }
      // })

     }

     login(email, password){
        return this.afAuth.signInWithEmailAndPassword(email, password).then(()=>{
          this.afStore.collection('accounts').doc<Account>
          (this.user.uid).
          valueChanges().pipe(
            take(1),
            map(account=>{
              account.id = this.user.uid;
              return account
            })
          ).subscribe(account=>{
            this.account = account
            if(this.account.role === 'Admin'){
              this.router.navigate(['/admin'])
            }else if(this.account.role === 'TA'){
              this.router.navigate(['/admin-monitor'])
            }
          })


        })
     }

    //  getCurrentUser(){
    //    return this.afAuth.currentUser
    //  }

     register(email, password){

        return this.afAuth.createUserWithEmailAndPassword(email, password).then(()=>{
          if(this.isLoggedIn){
            console.log(this.user.uid)
            // this.updatePhotoURL("https://firebasestorage.googleapis.com/v0/b/choicesnew-a0046.appspot.com/o/images%2FChoicesProfile.png?alt=media&token=7afd3f21-7b16-4391-b66b-2ec31870ff38")
            this.afStore.collection('users').doc(this.user.uid).set({uid: this.user.uid ,
               email: this.user.email,
              displayName: this.user.displayName,
            photoURL: this.user.photoURL});
          }
        })

     }

    //  async sendVerificationMail(){
    //    return await (await this.afAuth.currentUser).sendEmailVerification().then(()=>{

    //    })
    //  }
    getUserDoc(){
      var user: Observable<User>;
      user = this.afAuth.authState.pipe(switchMap(user => {
        if (user) {
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      }))
      return user
    }
     updateEmail(email){
      this.afAuth.onAuthStateChanged((user)=>{
        if (user){
          user.updateEmail(email).then(async ()=>{

            this.user = {
              uid: user.uid,
              email: user.email,
              photoURL: user.photoURL
            }
            this.afStore.collection('users').doc(user.uid).update({
              email: email
            })
            localStorage.setItem('user', JSON.stringify(this.user))
            JSON.parse(localStorage.getItem('user'))

            // const alert = this.alertCtrl.create({
            //   header: 'Success',
            //   message: 'Email successfully changed.',
            //   buttons:[{
            //     text: 'OK',
            //     role: 'OK',
            //     handler: ()=>{
            //       this.router.navigate(['/tabs/settings/account'])
            //     }}

            //   ]
            // })
            // await (await alert).present()

            // this.user.photoURL = user.photoURL
          }).catch(async err=>{

              // const alert = this.alertCtrl.create({
              //   header: 'Login and try again',
              //   message: 'Changing email requires you to login recently.',
              //   buttons:[{
              //     text: 'Login',
              //     handler: ()=>{
              //       this.logOut()

              //     }},
              //     {
              //       text: 'Cancel',
              //       role: 'cancel',
              //     }
              //   ]
              // })
              // await (await alert).present()


          })
        }
      })
     }

     updatePassword(password){
      this.afAuth.onAuthStateChanged((user)=>{
        if (user){
          user.updatePassword(password).then(async ()=>{

            this.user = {
              uid: user.uid,
              email: user.email,
              photoURL: user.photoURL
            }
            localStorage.setItem('user', JSON.stringify(this.user))
            JSON.parse(localStorage.getItem('user'))

            // const alert = this.alertCtrl.create({
            //   header: 'Success',
            //   message: 'Password successfully changed.',
            //   cssClass: 'buttonCss',
            //   buttons:[{
            //     text: 'OK',
            //     cssClass: 'first-button',
            //     role: 'OK',
            //     handler: ()=>{
            //       this.router.navigate(['/tabs/settings/account'])
            //     }}

            //   ]
            // })
            // await (await alert).present()

            // this.user.photoURL = user.photoURL
          }).catch(async err=>{

              // const alert = this.alertCtrl.create({
              //   header: 'Login and try again',
              //   message: 'Changing password requires you to login recently.',
              //   cssClass: 'buttonCss',
              //   buttons:[{
              //     text: 'Login',
              //     cssClass: 'first-button',
              //     handler: ()=>{
              //       this.logOut()
              //     }},
              //     {
              //       text: 'Cancel',
              //       cssClass: 'second-button',
              //       role: 'cancel',
              //     }
              //   ]
              // })
              // await (await alert).present()


          })
        }
      })
     }

    passwordReset(email){
      return this.afAuth.sendPasswordResetEmail(email)
      .then(()=>{
        window.alert('Password reset email has been sent, please check your inbox.');
      }).catch((error)=>{
        window.alert(error)
      })
    }

    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'))
      return (user !== null) ? true : false
    }

     async logOut() {
      // await this.presenceService.setPresence('offline');
      return this.afAuth.signOut().then(()=>{
        // this.user = null
        // this.userData = null
        localStorage.removeItem('user')
        console.log(this.user)
        window.location.reload();
        this.router.navigate(['/login'])
      })
    }

    // getUserInfo(): User{
    //   //  this.afAuth.onAuthStateChanged((user)=>{
    //   //   if (user){
    //   //     console.log(user.uid)
    //   //     this.user = {
    //   //       uid: user.uid,
    //   //       email: user.email,
    //   //       photoURL: user.photoURL
    //   //     }
    //   //   }else{
    //   //     this.user = null
    //   //   }
    //   // }).then(()=>{
    //   // })
    //   this.user = JSON.parse(localStorage.getItem('user'))
    //   return this.user


    // }

    updatePhotoURL(pURL){

      this.afAuth.onAuthStateChanged((user)=>{
        if (user){
          user.updateProfile({
            photoURL: pURL
          }).then(()=>{
            this.afStore.collection('users').doc(user.uid).update({
              photoURL: pURL
            })
            console.log(pURL)
            console.log(user.photoURL)
            this.user = {
              uid: user.uid,
              email: user.email,
              photoURL: user.photoURL
            }
            localStorage.setItem('user', JSON.stringify(this.user))
            JSON.parse(localStorage.getItem('user'))
            console.log(this.user.photoURL)
            this.router.navigate(['/tabs'])
            // this.user.photoURL = user.photoURL
          })
        }
      })
    }

    getUser(): User{
      const user = JSON.parse(localStorage.getItem('user'))
      if (user === null){
        return null
      }
      return user
    }

    // signInWithGoogle() {
    //   const provider = new auth.GoogleAuthProvider();
    //   const scopes = ['profile', 'email'];
    //   return this.socialSignIn(provider.providerId, scopes);
    // }



}

