import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductList } from './components/front/product-list/product-list';
import { Navbar } from './components/shared/navbar/navbar';
import { Footer } from './components/shared/footer/footer';
@Component({
  imports: [RouterOutlet, ProductList,RouterLink,RouterLinkActive, Navbar,Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('TuniSanat');
  modeSombre = signal(false);
}
