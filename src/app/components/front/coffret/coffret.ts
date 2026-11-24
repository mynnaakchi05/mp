import { Component, inject, signal, computed,OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product';
import { PrixTNDPipe } from '../../../pipes/prix-tnd-pipe';
@Component({
  selector: 'app-coffret',
  standalone: true,
  imports: [PrixTNDPipe],
  templateUrl: './coffret.html',
  styleUrl: './coffret.css'
})
export class Coffret implements OnInit{
  service=inject(ProductService);
  produits=signal<Product[]>([]);
  produitsSelectionnes= signal<Product[]>([]);
  total=computed(()=>this.produitsSelectionnes().reduce((somme,p)=>somme+p.prix,0));
  ngOnInit():void {
    this.service.getProducts().subscribe({
      next:(data)=>{
        this.produits.set(data);
      },
      error:(err)=>{
        console.error(err);
      }
    });
  }
  ajouterProduit(p:Product):void{
    const existe=this.produitsSelectionnes().some(produit=>produit.id==p.id);
    if(!existe && p.disponible && p.stock>0){
      this.produitsSelectionnes.update(
        liste=>[...liste,p]
      );
    }
  }
  retirerProduit(p:Product):void{
    this.produitsSelectionnes.update(
      liste=>liste.filter(produit=>produit.id!==p.id)
    );
  }


}