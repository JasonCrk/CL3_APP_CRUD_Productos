import { Component, inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'

import type { ProductRequest } from '../../models/ProductRequest'

import { ApiProductsService } from '../../services/api-products.service'

import { MessageService } from 'primeng/api'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { InputNumberModule } from 'primeng/inputnumber'
import { FloatLabelModule } from 'primeng/floatlabel'
import { ButtonModule } from 'primeng/button'
import { ToastModule } from 'primeng/toast'

import { productForm } from '../../forms/productForm'

@Component({
  selector: 'app-create-product-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputTextareaModule,
    InputNumberModule,
    FloatLabelModule,
    ToastModule,
    ButtonModule
  ],
  providers: [MessageService],
  templateUrl: './create-product-form-page.component.html'
})
export class CreateProductFormPageComponent {

  private readonly _router = inject(Router)
  private readonly _apiProducts = inject(ApiProductsService)
  private readonly _toastService = inject(MessageService)

  createProduct = productForm

  isLoading = false
  isSubmitted = false

  onSubmit() {
    this.isLoading = true
    this.isSubmitted = true

    if (this.createProduct.invalid) {
      this.isLoading = false
      return
    }

    this._apiProducts.createProduct(this.createProduct.value as ProductRequest)
      .subscribe({
        next: () => {
          this._router.navigate(['/'])
        },
        error: ({ message }) => {
          this._toastService.add({ severity: 'error', summary: 'Create product', detail: message })
        }
      })
  }

  get descriptionField() {
    return this.createProduct.controls.description
  }

  get priceField() {
    return this.createProduct.controls.price
  }

  get stockField() {
    return this.createProduct.controls.stock
  }
}
