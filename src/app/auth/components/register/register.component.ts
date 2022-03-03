import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoggedIn: boolean = false
  constructor(
    private api: ApiService, 
    private auth: AuthService, 
    private router:Router
  ) { }
  ngOnInit() {
    this.isUserLoggedIn(); 
  }
  
  onSubmit(form: NgForm) {
    this.api.postTypeRequest('user/register', form.value).subscribe((res: any) => {
      if (res.status) { 
        this.auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
        this.auth.setDataInLocalStorage('token', res.token);  
        window.location.reload()

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
    this.router.navigate([''])
  }

}
