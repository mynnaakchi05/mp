
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { Admin } from '../../../services/admin';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  private admin = inject(Admin);
  private router = inject(Router);
  deconnexion(): void {
    this.admin.deconnexion();
    this.router.navigate(['/admin-login']);
  }
}
