import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorBoxComponent } from '../../components/error-box/error-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsServiceService } from '../../services/validators-service.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  private validatorService = inject(ValidatorsServiceService);
  private authService = inject(AuthenticationService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);

  private fb = inject(FormBuilder);
  error: string | null = null;

  public myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(1)], []],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern),
      ],
      [],
    ],
    password: ['', [Validators.required, Validators.minLength(6)], []],
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

  // * this is to configure what the snackbar box will have inside:
  snackbarHandler(message: string): void {
    this.snackbar.open(message, 'ok', { duration: 4000 });
  }

  // onRegister() {
  //   console.log('input values =>', this.myForm.value);
  //   const { name, email, password } = this.myForm.value;

  //   this.authService.register(name, email, password).subscribe({
  //     next: () => {
  //       // * to navigate to dashboard because login credentials where correct:

  //       // * to navigate to dashboard because login credentials where correct:
  //       this.router.navigateByUrl('/heroes');
  //       // todo:
  //       // * pop up message:
  //       this.snackbarHandler(
  //         `Thank you for registering with us ${name}, enjoy! 😸💚`
  //       );
  //     },
  //     error: (err) => {
  //       return this.openErrorDialog(err);
  //     },
  //   });
  // }

  onRegister(): void {
    // if (this.registerForm.invalid) {
    //   console.log('invalid form. Check logic.');

    //   return;
    // }
    console.log(this.myForm.value);
    this.authService.register(this.myForm.getRawValue()).subscribe({
      next: (currentUser) => {
        // * to save token:
        this.authService.setToken(currentUser);
        // * save user on whole app:
        this.authService.setCurrentUser(currentUser);
        // * to navigate to dashboard because login credentials where correct:

        // * to navigate to dashboard because login credentials where correct:
        this.router.navigateByUrl('/heroes');
        // todo:
        // * pop up message:
        this.snackbarHandler(
          `Thank you for registering with us ${name}, enjoy! 😸💚`
        );
      },
      error: (err: HttpErrorResponse) => {
        // * because we know errors come as an array from backend:
        // const myEr = err.error.join(', ');
        this.error = err.error.join(', ');

        return this.openErrorDialog(this.error!);
      },
    });
  }
}
