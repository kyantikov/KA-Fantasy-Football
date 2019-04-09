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
      // this._router.navigate(['dashboard']);
    })
  }



}
