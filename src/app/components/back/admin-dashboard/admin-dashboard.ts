import { Component,inject,OnInit,computed,signal } from '@angular/core';
import { ProductService } from '../../../services/product';
import { Product } from '../../../models/product';
import { PrixTNDPipe } from '../../../pipes/prix-tnd-pipe';

@Component({
  selector:'app-admin-dashboard',
  standalone:true,
  imports:[PrixTNDPipe],
  templateUrl:'./admin-dashboard.html',
  styleUrl:'./admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  private productService=inject(ProductService);
  produits=this.productService.produits;
  erreur=signal('');
  totalProduits=computed(()=>this.produits().length);
  produitsDisponibles=computed(()=>this.produits().filter(p=>p.disponible).length);
  produitsRupture=computed(()=>this.produits().filter(p=>p.stock==0).length);
  produitsStockFaible=computed(()=>this.produits().filter(
    p=>p.stock>0 && p.stock<3).length
  );
  produitsStockNormal=computed(()=>this.produits().filter(p=>p.stock>=3).length);
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      error:()=>{
        this.erreur.set('Impossible de charger les produits.');
      }
    });
  }
  modifierStock(produit:Product,valeur:number):void {
    const ancienStock=produit.stock;
    const nouveauStock=ancienStock+valeur;
    if(nouveauStock<0){
      return;
    }
    const produitModifie:Product={...produit,stock:nouveauStock,disponible:nouveauStock>0};
    this.productService.updateProduct(produitModifie).subscribe({
      next:()=>{
        const mouvement={
          produitId:produit.id,
          produitNom:produit.nom,
          artisan:produit.artisan,
          ancienStock:ancienStock,
          nouveauStock:nouveauStock,
          variation:valeur,
          date:new Date().toLocaleString()
        };
        this.productService.ajouterMouvement(mouvement).subscribe();
      },
      error:()=>{
        this.erreur.set('Impossible de modifier le stock.');
      }
    });
  }
}



