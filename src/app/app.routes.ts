import { Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/feature/shopping-cart.component';
import { QuoteComponent } from './payin/feature/quote/quote.component';
import { ResponseComponent } from './payin/feature/response/response.component';

export const routes: Routes = [
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
  {
    path: 'quote',
    component: QuoteComponent,
  },
  {
    path: 'response',
    component: ResponseComponent,
  },
  {
    path: '',
    redirectTo: '/shopping-cart',
    pathMatch: 'full',
  },
];
