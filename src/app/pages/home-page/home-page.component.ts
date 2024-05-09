import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog'

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
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  private readonly _apiProducts = inject(ApiProductsService)
  private readonly _confirmationService = inject(ConfirmationService)
  private readonly _toastService = inject(MessageService)

  products$ = this._apiProducts.getAllProducts()

  deleteProductConfirmation(event: Event, productId: number) {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure to remove this product?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this._apiProducts.deleteProduct(productId).subscribe({
          next: ({ message }) => {
            this._toastService.add({ severity: 'success', summary: 'Confirmed', detail: message })
            this.products$ = this._apiProducts.getAllProducts()
          },
          error: () => {
            this._toastService.add({ severity: 'error', summary: 'Error', detail: 'Could not delete product, try again later' })
          }
        })
      }
    })
  }
}
