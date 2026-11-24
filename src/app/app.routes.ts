import { Routes } from '@angular/router';
import { ProductDetails } from './components/front/product-detail/product-details';
import { Home } from './components/front/home/home';
import { ProductList } from './components/front/product-list/product-list';
import { Coffret } from './components/front/coffret/coffret';
import { About } from './components/front/about/about';

import { AdminLayout } from './components/back/admin-layout/admin-layout';
import { AdminLogin } from './components/back/admin-login/admin-login';
import { AdminDashboard } from './components/back/admin-dashboard/admin-dashboard';
import { AdminProducts } from './components/back/admin-products/admin-products';
import { ChangePassword } from './components/back/change-password/change-password';
import { adminGuardsGuard } from './components/back/guards/admin-guards-guard';
import { AdminHistory } from './components/back/admin-history/admin-history';
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'boutique', component: ProductList },
  { path: 'coffret', component: Coffret },
  { path: 'about', component: About },
  { path: 'produit/:id', component: ProductDetails },

  {
    path: 'admin-login',
    title: 'Connexion Administrateur',
    component: AdminLogin,
  },

  {
  path: 'admin',
  component: AdminLayout,
  children:[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: AdminDashboard ,canActivate: [adminGuardsGuard]},
    { path: 'products', component: AdminProducts ,canActivate: [adminGuardsGuard]},
    { path: 'change-password', component: ChangePassword ,canActivate: [adminGuardsGuard]},
    { path: 'history', component: AdminHistory, canActivate: [adminGuardsGuard] }
  ]
},

  { path: '**', redirectTo: '' },
];
