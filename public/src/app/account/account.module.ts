import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AccRoutingModule } from './acc-routing.module';

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
