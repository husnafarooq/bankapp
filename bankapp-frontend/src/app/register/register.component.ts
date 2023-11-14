import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // to hold error message
  RegisterError: string='';
  RegisterSuccess: string='';
  constructor(private fb:FormBuilder,private api:ApiService,private loginRouter:Router){}

  registerForm=this.fb.group({ //formGroup
    username:['',[Validators.required,Validators.pattern('[a-zA-z ]*')]], //formarray
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-z0-9]*')]]
  })
  //formControl passed to html form

  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
    let username=this.registerForm.value.username
    let acno=this.registerForm.value.acno
    let password=this.registerForm.value.password
    console.log(username,acno,password);
    this.api.register(username,acno,password).subscribe((response:any)=>{
      console.log(response);//message
      alert(response.message); //success
      this.RegisterSuccess=response.message;
      setTimeout(()=>{
        //redirect to login page
        this.loginRouter.navigateByUrl('')
      },3000)
      
     

    },
    (response:any)=>{
      this.RegisterError=response.error.message; //error message
      setTimeout(() => {
        this.registerForm.reset();
        this.RegisterError='';
      },2000);
    })
    
    }
    else{
      alert('Invalid form');
    }
    
    
  }
}
