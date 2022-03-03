import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false
  userId: number = 0

  ngOnInit(): void {
    this.isUserLoggedIn()

  }

  constructor(
    private api: ApiService, 
    private auth: AuthService, 
    private router:Router
  ) { }
  
  onSubmit(form: NgForm) {
    let userId =  this.auth.getUserDetails()[0].id
    let data= {...form.value, userId}
    console.log(data)
    this.api.postTypeRequest('user/surveydata', data).subscribe((res: any) => {
      if (res.status) { 
        this.router.navigate(['thankyou']);
      }     
    });
  }

  isUserLoggedIn(){
    if(this.auth.getUserDetails() != null){
      this.isLoggedIn = true;
    }
  }
  logout(){
    this.auth.clearStorage()
    window.location.reload()
  }

}
