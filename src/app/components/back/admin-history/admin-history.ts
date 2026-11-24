import { Component, inject, OnInit, computed } from '@angular/core';
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
  private productService = inject(ProductService);
  mouvements = this.productService.mouvements;
  mouvementsTries = computed(() =>
    [...this.mouvements()].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  );

  ngOnInit(): void {
    this.productService.getMouvementsStock().subscribe();
  }
}