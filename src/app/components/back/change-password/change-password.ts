import {Component,signal,inject} from '@angular/core';
import {form,FormField,FormRoot,required} from '@angular/forms/signals';
import {Admin} from '../../../services/admin';
import {Administrateur} from '../../../models/administrateur';

@Component({
  selector:'app-change-password',
  standalone:true,
  imports:[FormField,FormRoot],
  templateUrl:'./change-password.html',
  styleUrl:'./change-password.css',
})
export class ChangePassword {
  private adminService=inject(Admin);
  donnees=signal({ancienPassword:'',nouveauPassword:'',confirmation:''});
  erreur=signal('');
  message=signal('');
  passwordForm=form(this.donnees,(path)=>{
    required(path.ancienPassword);
    required(path.nouveauPassword);
    required(path.confirmation);
  });
  onModifier():void{
    if (this.passwordForm().invalid()) {
      return;
    }
    const admin=this.adminService.administrateur();
    if (admin===null) {
      this.erreur.set('Administrateur non connecté');
      return;
    }
    if (this.donnees().ancienPassword!==admin.password) {
      this.erreur.set('Ancien mot de passe incorrect');
      return;
    }
    if (this.donnees().nouveauPassword!==this.donnees().confirmation) {
      this.erreur.set('Les mots de passe ne correspondent pas');
      return;
    }
    const adminModifie:Administrateur={
      id:admin.id,
      email:admin.email,
      password:this.donnees().nouveauPassword
    };
    this.adminService.changerMotDePasse(this.donnees().nouveauPassword).subscribe({
      next:()=>{
        this.message.set('Mot de passe modifié avec succès');
        this.erreur.set('');
        this.donnees.set({
          ancienPassword:'',
          nouveauPassword:'',
          confirmation:''
        });
        this.passwordForm().reset();
      },
      error:()=>{
        this.erreur.set('Erreur lors de la modification');
      }
    });
  }
}
