import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-history',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './admin-history.html',
  styleUrl: './admin-history.css'
})
export class AdminHistory implements OnInit {
  private productService=inject(ProductService);
  mouvements=this.productService.mouvements;
 ngOnInit(): void {
    this.productService.getMouvementsStock().subscribe();
  }
}