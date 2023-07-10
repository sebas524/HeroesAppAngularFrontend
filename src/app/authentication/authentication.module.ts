import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ErrorBoxComponent } from './components/error-box/error-box.component';
import { AuthLayoutPageComponent } from './pages/auth-layout-page/auth-layout-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    ErrorBoxComponent,
    AuthLayoutPageComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AuthenticationModule {}
