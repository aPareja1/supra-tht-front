import { Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/feature/shopping-cart.component';

export const routes: Routes = [
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
  {
    path: '',
    redirectTo: '/shopping-cart',
    pathMatch: 'full',
  },
];
