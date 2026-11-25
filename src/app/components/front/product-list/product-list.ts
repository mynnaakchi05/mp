import { Component,OnInit,inject, signal,computed } from '@angular/core';
import { ProductService } from '../../../services/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  private service= inject(ProductService);
  produits =this.service.produits;
  nomRecherche=signal('');
  prixMax =signal('');
  produitsFiltres=computed(()=>{return this.produits().filter(p=>{
      const nomOK=p.nom.toLowerCase().includes(this.nomRecherche().toLowerCase());
      const prixOK=this.prixMax()==''||p.prix<=Number(this.prixMax());
      return nomOK&&prixOK;
    });
  });
  ngOnInit() {
    this.service.getProducts().subscribe();
    
  }
  effacerRecherche() {
    this.nomRecherche.set('');
    this.prixMax.set('');
  }


}


