import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorBoxComponent } from '../../components/error-box/error-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidatorsServiceService } from '../../services/validators-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  private validatorService = inject(ValidatorsServiceService);
  private authService = inject(AuthenticationService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  private fb = inject(FormBuilder);
  error: string | null = null;

  public myForm: FormGroup = this.fb.group({
    // name: ['', [Validators.required, Validators.minLength(1)], []],
    email: [
      'john@gmail.com',
      [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern),
      ],
      [],
    ],
    password: ['123456', [Validators.required, Validators.minLength(6)], []],
  });

  // isFieldValid(field: string) {
  //   return this.validatorService.isFieldValid(this.myForm, field);
  // }

  // getErrorMessage() {
  //   return 'You must enter a value';
  // }

  // * method to activate box opening:
  openErrorDialog(errorMessage: string) {
    this.dialog.open(ErrorBoxComponent, {
      data: { errorMessage },
    });
  }

  // onLogin() {
  //   console.log('info given => ', this.myForm.value);
  //   const { email, password } = this.myForm.value;
  //   this.authService.login(email, password).subscribe({
  //     // * if everything went well:
  //     next: () => {
  //       return this.router.navigateByUrl('/heroes');
  //     },
  //     // * if not, then error:
  //     error: (err) => {
  //       return this.openErrorDialog(err);
  //     },
  //   });
  // }

  onLogin(): void {
    // if (this.registerForm.invalid) {
    //   console.log('invalid form. Check logic.');

    //   return;
    // }
    console.log(this.myForm.value);
    this.authService.login(this.myForm.getRawValue()).subscribe({
      next: (currentUser) => {
        // * to save token:
        this.authService.setToken(currentUser);
        // * save user on whole app:
        this.authService.setCurrentUser(currentUser);
        this.error = null;
        return this.router.navigateByUrl('/heroes');
      },
      error: (err: HttpErrorResponse) => {
        // * because we know errors come as an array from backend:
        const myEr = 'Invalid credentials';
        return this.openErrorDialog(myEr);
      },
    });
  }
}
