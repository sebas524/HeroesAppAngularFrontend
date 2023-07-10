import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { AuthenticationService } from './authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private authService = inject(AuthenticationService);

  ngOnInit(): void {
    // * note: we wabnt to get the user every time when we load our app. why? because normally we store our current user in memory, and after login or register we store it in localstorage. so every time we are jumping into our app we would need to get current user. best way to do this is in app component. because this component loads once throughout the whole lifecyle.
    this.authService.getCurrentUser().subscribe({
      next: (currentUser) => {
        this.authService.setCurrentUser(currentUser);
      },
      error: (err) => {
        console.log('from app =>', err);
        // * if we dont get current user, we set it to null:
        this.authService.setCurrentUser(null);
      },
    });
    this.authService.currentUser$.subscribe((currentUser) => {
      console.log('currentUser=>', currentUser);
    });
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      console.log('isLoggedIn=>', isLoggedIn);
    });
  }
}
