import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

export const cartGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  const loggedIn = authService.loggedIn$.getValue() === true;

  if (!loggedIn) {
    snackBar.open('Unauthorized', 'Close', {
      duration: 3000,
    });
    return false;
  }

  return true;
};
