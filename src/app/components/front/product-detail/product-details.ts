import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product';
import { Product } from '../../../models/product';
import { DatePipe } from '@angular/common';
import { PrixTNDPipe } from '../../../pipes/prix-tnd-pipe';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, DatePipe, PrixTNDPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  private ps=inject(ProductService);
  private route=inject(ActivatedRoute);
  product=signal<Product | null>(null);

  ngOnInit():void{
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.ps.getProductById(id).subscribe({  
        next: (data)=>{this.product.set(data);},
        error: (err)=>{console.log(err);}
      });
    }
  }
}
