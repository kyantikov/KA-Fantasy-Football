import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AccountModule } from './account/account.module';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AccountModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
