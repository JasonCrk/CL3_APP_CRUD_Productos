import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button';

import { ApiProductsService } from '../../services/api-products.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,
    TableModule,
    ButtonModule,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  private readonly _apiProducts = inject(ApiProductsService)

  products$ = this._apiProducts.getAllProducts()
}
