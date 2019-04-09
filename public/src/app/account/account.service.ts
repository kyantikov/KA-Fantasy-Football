import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountModule } from './account.module';

@Injectable({
  providedIn: AccountModule,
})
export class AccountService {

  constructor(private _http: HttpClient) { };


}
