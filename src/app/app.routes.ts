import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreateProductFormPageComponent } from './pages/create-product-form-page/create-product-form-page.component';
import { UpdateProductFormPageComponent } from './pages/update-product-form-page/update-product-form-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: '/create',
    component: CreateProductFormPageComponent,
  },
  {
    path: 'update/:id',
    component: UpdateProductFormPageComponent,
  },
];
