import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _accountService: AccountService) { }
    
  loginUser: any;
  errors: any;

  ngOnInit() {
    this.loginUser = {email: '', password:''}
  }

  Login(){
    console.log(this.loginUser);
    this._accountService.loginUser(this.loginUser).subscribe(user =>{
      console.log(user);
      if(user['message'] == "error"){
        this.errors = user['error'];
        this.loginUser = {email: '', password: ''};
      } else {
        this._router.navigate(['dashboard']);
      }
    })
  }



}
