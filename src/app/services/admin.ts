import {Service,inject,signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable,map,tap} from 'rxjs';
import {Administrateur} from '../models/administrateur';

const apiUrl='http://localhost:3000/administrateurs';
@Service()
export class Admin {
  private http=inject(HttpClient);
  estConnecte=signal(false);
  administrateur=signal<Administrateur|null>(null);
  connexion(email:string,password:string):Observable<boolean> {
    return this.http.get<Administrateur[]>(apiUrl+'?email='+email+'&password='+password).pipe(
      tap(admins=>{
        if(admins.length>0){
          this.estConnecte.set(true);
          this.administrateur.set(admins[0]);
        }else{
          this.estConnecte.set(false);
          this.administrateur.set(null);
        }
      }),
      map(admins=>admins.length>0));
  }
  deconnexion():void{
    this.estConnecte.set(false);
    this.administrateur.set(null);
  }
  changerMotDePasse(nouveauPassword:string):Observable<Administrateur> {
    const admin=this.administrateur();
    return this.http.put<Administrateur>(`${apiUrl}/${admin?.id}`,
      {...admin,password:nouveauPassword}).pipe(tap(resultat=>{
        this.administrateur.set(resultat);
      })
    );
  }
}




