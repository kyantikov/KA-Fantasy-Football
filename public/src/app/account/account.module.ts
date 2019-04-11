import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccRoutingModule } from './acc-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { from } from 'rxjs';
import { AccountService } from './account.service';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AccountInfoComponent,
  ],
  imports: [
    CommonModule,
    AccRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    AccountInfoComponent,
    AccRoutingModule,
  ],
  providers:[AccountService],
})
export class AccountModule { }
