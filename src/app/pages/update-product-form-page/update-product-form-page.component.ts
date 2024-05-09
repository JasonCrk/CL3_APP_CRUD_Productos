import { Component, OnInit, inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'

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
  selector: 'app-update-product-form-page',
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
  templateUrl: './update-product-form-page.component.html',
})
export class UpdateProductFormPageComponent implements OnInit {

  private readonly _router = inject(Router)
  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _apiProducts = inject(ApiProductsService)
  private readonly _toastService = inject(MessageService)

  updateProductForm = productForm

  isLoading = true
  isSubmitted = false

  ngOnInit(): void {
    const productId = Number(this._activatedRoute.snapshot.params['id'])

    this._apiProducts.getProductById(productId).subscribe({
      next: product => {
        this.updateProductForm.setValue({ price: product.price, stock: product.stock, description: product.description })
        this.isLoading = false
      },
      error: () => {
        this._router.navigate(['/'])
      }
    })
  }

  onSubmit() {
    this.isLoading = true
    this.isSubmitted = true

    if (this.updateProductForm.invalid) {
      this.isLoading = false
      return
    }

    this._apiProducts.createProduct(this.updateProductForm.value as ProductRequest)
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
    return this.updateProductForm.controls.description
  }

  get priceField() {
    return this.updateProductForm.controls.price
  }

  get stockField() {
    return this.updateProductForm.controls.stock
  }
}

