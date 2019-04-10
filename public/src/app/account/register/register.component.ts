import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  newUser: any;  

  ngOnInit() {
  }

}
