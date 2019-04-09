import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccRoutingModule } from './acc-routing.module';

import { AccountService } from './account.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AccountInfoComponent,
  ],
  imports: [
    CommonModule,
    AccRoutingModule
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    AccountInfoComponent,
    AccRoutingModule,
  ]
})
export class AccountModule { }
