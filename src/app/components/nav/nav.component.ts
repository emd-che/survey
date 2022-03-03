import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLoggedIn: boolean = false
  username: string = ''

  constructor(
    private auth: AuthService) { }

  ngOnInit(): void {
    
    this.isUserLoggedIn()
  }

  

  isUserLoggedIn(){
    if(this.auth.getUserDetails() != null){
      this.isLoggedIn = true;
      this.username = this.auth.getUserDetails()[0].username
    }
  }
  logout(){
    this.auth.clearStorage()
    window.location.reload()
  }

}
