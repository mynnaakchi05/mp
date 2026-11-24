import { Component, signal, inject } from '@angular/core';
import {form,FormField,FormRoot,required, email} from '@angular/forms/signals';
import { Router } from '@angular/router';
import { Admin } from '../../../services/admin';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormField, FormRoot],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  private adminService = inject(Admin);
  private router = inject(Router);
  donnees = signal({email: '',password: ''});
  erreur = signal('');
  loginForm = form(this.donnees, (path) => {
    required(path.email, {
      message: "L'adresse e-mail est obligatoire"
    });
    email(path.email, {
      message: 'Format e-mail invalide'
    });
    required(path.password, {
      message: 'Le mot de passe est obligatoire'
    });
  });
  onConnexion(): void {
  if (this.loginForm().invalid()) {
    return;
  }
  const { email, password } = this.donnees();
  this.adminService.connexion(email, password).subscribe({
    next: (success) => {
      if (success) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.erreur.set('Email ou mot de passe incorrect');
      }

    },
    error: () => {
      this.erreur.set('Erreur de connexion au serveur');
    }
  });
}
}
