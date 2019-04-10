import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface Errors {
  first_name:string,
  last_name:string,
  email:string,
  password:string,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _accountService: AccountService
  ) { }

  pwc: any;
  passConfirm: string;
  newUser: any;  
  errors: Errors;

  ngOnInit() {
    this.newUser = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
    this.pwc = '';
    this.errors=null;
    this.passConfirm = '';
  }

  Register(){
    this.errors=null;
    if (this.pwc != this.newUser.password){
      this.passConfirm = 'Passwords do not match';
    } else {
      this._accountService.registerUser(this.newUser).subscribe(newUser => {
        if(newUser['message'] == 'error'){
          var submissionErrors = newUser['err']['error'];
          // for(var i of submissionErrors){
          //   if(submissionErrors[i]['path'] == 'first_name'){

          //   }
          // }
          this.newUser = {email: '', password: ''};
          this.pwc = '';
          console.log(this.errors);
        } else {
          this._router.navigate(['dashboard']);
        }
      })
    }
  }

}
