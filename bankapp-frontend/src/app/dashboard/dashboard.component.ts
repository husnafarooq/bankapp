import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  deleteConfirmStatus: boolean =false; //delete confirm
  acno:any //for parent to child data communication
  transferSuccess:string='';
  transferError:string='';
  user:string=''  //to hold the current username
  balance:string='' //to hold the current balance
  currentAcno:string=''; //to hold the currentAcno
  constructor(private fb:FormBuilder,private api:ApiService,private logoutRouter:Router){
    
  }
  ngOnInit(): void {
    if(localStorage.getItem('currentUser')){
      this.user=localStorage.getItem('currentUser')||''; //current user
    }
    // if(localStorage.getItem('balance')){
    //   this.balance=localStorage.getItem('balance')||''; //balance
    // }
    if(localStorage.getItem('currentAcno')){
      this.currentAcno=localStorage.getItem('currentAcno')||''; //currentAcno
    }
  }
  //create a formGroup and array
  FundTransferFrom=this.fb.group({
    creditAcno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-z0-9]*')]],
  })
  //control paasses to html page

  iscollapse: boolean=false

  collapse(){
    this.iscollapse=!this.iscollapse
  }
  //fund transfer
  dashboardForm(){
    if(this.FundTransferFrom.valid){
      let creditAcno=this.FundTransferFrom.value.creditAcno;
      let password=this.FundTransferFrom.value.password;
      let amount=this.FundTransferFrom.value.amount;
      this.api.fundTransfer(creditAcno,password,amount).subscribe((result:any)=>{
        console.log(result);
        this.transferSuccess=result.message
        setTimeout(()=>{
          this.transferSuccess=''
          this.FundTransferFrom.reset()
        },3000)
      },
      (result:any)=>{
        console.log(result.error.message);
        this.transferError=result.error.message
        setTimeout(()=>{
          this.transferError=''
          this.FundTransferFrom.reset()
        },3000)
      })
      // alert('Form clicked')
    }
    else{
      alert('please enter valid parameters')
    }
  }
  getBalance(){
    this.api.getBalance(this.currentAcno).subscribe((result:any)=>{
      this.balance=result.balance
    },
    (result:any)=>{
      alert(result.error.meassage)
    })
  }
  reset(){
    this.FundTransferFrom.reset()
    
  }
  logout(){
    this.logoutRouter.navigateByUrl('')
    localStorage.clear()
  }
  deleteAccount(){
    //data to be shared with the child
    this.acno=localStorage.getItem('currentAcno')  //1
    this.deleteConfirmStatus=true
  }
  cancelDeleteConfirm(){
    this.acno=''
    this.deleteConfirmStatus=false
    
  }
 
  

  
  

}

