import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AccountModule } from './account.module';

@Injectable()
export class AccountService {

  constructor(private _http: HttpClient) { };

  loginUser(user){
    return this._http.put('/login', user);
  }

  registerUser(newUser){
    return this._http.post('/user', newUser);
  }

}
