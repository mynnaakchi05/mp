import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../models/product';
import { PrixTNDPipe } from '../../../pipes/prix-tnd-pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink,PrixTNDPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  produit=input.required<Product>();

}
