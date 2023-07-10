import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const privateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        // * so, if not logged in, redirect then apply guard:
        router.navigateByUrl('/auth');

        return false;
        // * in other words:CANT ACCESS ROUTE
      }
      // * else, dont apply guard:

      // router.navigateByUrl('/pm/boards');
      // router.navigateByUrl('/auth');

      return true;
    })
  );
};
