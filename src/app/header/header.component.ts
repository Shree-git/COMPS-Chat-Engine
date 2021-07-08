import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn1;

  }

  logOut(){
    this.authService.logOut();
  }
}
