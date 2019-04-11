import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _accountService: AccountService,
    private fb: FormBuilder,
  ){
    this.form = fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required, Validators.minLength(8)],
    });
  }

  pwc: any;
  passConfirm: string;
  newUser: any;  
  errors: any;

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

  // onRegister(){
  //   this.errors=null;
  //   if (this.pwc != this.newUser.password){
  //     this.passConfirm = 'Passwords do not match';
  //   } else {
  //     this._accountService.registerUser(this.newUser).subscribe(newUser => {
  //       if(newUser['message'] == 'error'){
  //         this.newUser = {email: '', password: ''};
  //         this.pwc = '';
  //         console.log(this.errors);
  //       } else {
  //         this._router.navigate(['dashboard']);
  //       }
  //     })
  //   }
  // }

}
