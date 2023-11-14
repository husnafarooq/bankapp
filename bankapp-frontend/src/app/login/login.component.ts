import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError:string='';
  loginSuccess:boolean=false;
  constructor(private fb:FormBuilder,private api:ApiService,private loginRouter:Router){

  }
  ngOnInit(): void {
  }

  loginForm=this.fb.group({ //formGroup
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-z0-9]*')]]
  })
  //formControl passed to html form

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
    let acno=this.loginForm.value.acno
    let password=this.loginForm.value.password
    console.log(acno,password)
    this.api.login(acno,password).subscribe((response:any)=>{
      console.log(response);
      //success
      this.loginSuccess=true

      //to set current username into the local storage
      localStorage.setItem('currentUser',response.currentUser)

      //to set current balance in to the local storage
      localStorage.setItem('balance',response.balance)

      //to set current acno into the the local storage
      localStorage.setItem('currentAcno',response.currentAcno)

      //to set token in to the local storage
      localStorage.setItem('token',response.token)


      
      //alert('login successful');
      setTimeout(() => {
        this.loginRouter.navigateByUrl('/dashboard')
      }, 2000);
      
    },
    (response:any)=>{
      //error message
      this.loginError=response.error.message
      setTimeout(()=>{
        this.loginForm.reset()
        this.loginError=''
      },2000);
    })
    
    }
    else{
      alert('Invalid form');
    }
    
    
  }
}


