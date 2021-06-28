

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Account } from '../../models/account.model';
import { AccountService } from '../../services/account.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthenticationService,
      private accountService: AccountService,
      private router: Router,
) {

      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],

        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        pinNumber: ['', Validators.required],
        password: ['', Validators.compose([
          Validators.minLength(5),
          Validators.required,
          // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ])],
        cpassword: ['', Validators.required],

      }, {
        validators: [this.password.bind(this), this.pin.bind(this)]

      })
     }
  email: string
  fName: string
  lName: string
  // password: string
  cpassword: string
  account: Account
  backButtonSubscription;
  registerForm: FormGroup;
  loginError: boolean = false;
  loginErrorMessage: string = ''
  adminPin: any = '3241';
  taPin: any = '8796';

  public validation_messages = {
    firstName: [
      { type: 'required', message: 'First Name is required' }
    ],
    lastName: [
      { type: 'required', message: 'Last Name is required' }
    ],

    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      // { type: 'pattern', message: 'Please enter a valid password' },
      { type: 'minLength', message: 'Password must be over 5 characters' }
    ],
    cpassword: [
      { type: 'required', message: 'Password is required' }
    ],
    pinNumber: [
      { type: 'required', message: 'Please enter a pin number' }
    ],
  }

  ngOnInit() {
  }



  // ionViewDidEnter(){ this.backButtonSubscription = this.platform.backButton.subscribe(()=>{
  //   if ((this.router.isActive('/register', true) && this.router.url === '/register')) {
  //     navigator['app'].exitApp();
  //   }
  //   }); }

  // ionViewWillLeave(){ this.backButtonSubscription.unsubscribe();}

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('cpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  pin(formGroup: FormGroup) {
    const { value: pinNumber } = formGroup.get('pinNumber');
    console.log(pinNumber);
    console.log(this.adminPin)
    return (pinNumber === this.adminPin || pinNumber === this.taPin) ? null : { pinNotMatch: true };
  }

  register(){
    // if(this.password === this.cpassword){
    //   this.authService.register(this.email, this.password).then(()=>{
    //     this.router.navigate(['/tabs'])
    //     this.account = {
    //       fName: this.fName,
    //       lName: this.lName
    //     }
    //     this.accountService.updateAccount(this.account)

    //   })

    // }
    if(this.registerForm.get('pinNumber').value === this.adminPin){
       this.authService.register(this.registerForm.get('email').value, this.registerForm.get('password').value).then(()=>{
        this.router.navigate(['/admin'])
        this.account = {
          fName: this.registerForm.get('firstName').value,
          lName: this.registerForm.get('lastName').value,
          role: 'Admin'
        }
        this.accountService.createAccount(this.account)

      }).catch(err=>{
        this.loginError = true;
        this.loginErrorMessage = err.message
      })
    } else if(this.registerForm.get('pinNumber').value === this.taPin){
      this.authService.register(this.registerForm.get('email').value, this.registerForm.get('password').value).then(()=>{
        this.router.navigate(['/admin-monitor'])
        this.account = {
          fName: this.registerForm.get('firstName').value,
          lName: this.registerForm.get('lastName').value,
          role: 'TA'
        }
        this.accountService.createAccount(this.account)

      }).catch(err=>{
        this.loginError = true;
        this.loginErrorMessage = err.message
      })
    }
  }

}

