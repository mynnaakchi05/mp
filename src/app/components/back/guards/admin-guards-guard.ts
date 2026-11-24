import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Admin } from '../../../services/admin';

export const adminGuardsGuard: CanActivateFn=() => {
  const admin = inject(Admin);
  const router = inject(Router);
  if (admin.estConnecte()) {
    return true;
  }
  else {
    router.navigate(['/admin-login']);
    return false;
  }

};