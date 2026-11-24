import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product';
import { MouvementStock } from '../models/mouvement-stock';

const mouvementsUrl = 'http://localhost:3000/mouvementsStock';
const apiUrl='http://localhost:3000/products';
@Service()
export class ProductService {
  private http=inject(HttpClient);
  private _produits =signal<Product[]>([]);
  produits= this._produits.asReadonly();
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(apiUrl).pipe(
      tap(data => this._produits.set(data))
    );
  }
  getProductById(id:string):Observable<Product>{
    return this.http.get<Product>(`${apiUrl}/${id}`);
  }
  addProduct(product:Product): Observable<Product>{
    return this.http.post<Product>(apiUrl,product).pipe(
      tap(p => this._produits.update(list => [...list, p]))
    );
  }
  updateProduct(product:Product):Observable<Product> {
    return this.http.put<Product>(
      `${apiUrl}/${product.id}`,product).pipe(
      tap(p => this._produits.update(list=>list.map(x=> x.id==p.id?p:x)
      ))
    );
  }
  deleteProduct(id:string):Observable<void>{
    return this.http.delete<void>(`${apiUrl}/${id}`).pipe(
      tap(()=>this._produits.update(list =>list.filter(p =>p.id!== id)))
    );
  }
  private _mouvements = signal<MouvementStock[]>([]);
  mouvements = this._mouvements.asReadonly();
  getMouvementsStock(): Observable<MouvementStock[]> {
    return this.http.get<MouvementStock[]>(mouvementsUrl).pipe(
      tap(data => this._mouvements.set(data))
    );
  }
  ajouterMouvement(mouvement: MouvementStock): Observable<MouvementStock> {
    return this.http.post<MouvementStock>(mouvementsUrl,mouvement).pipe(
      tap(data => this._mouvements.update(
        liste => [...liste, data]
      ))
    );
  }
}
