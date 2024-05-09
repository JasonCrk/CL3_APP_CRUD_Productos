import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import type { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import type { Product } from '../models/Product';
import type { MessageResponse } from '../models/MessageResponse';
import type { ProductRequest } from '../models/ProductRequest';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {

  private readonly _http = inject(HttpClient)

  private readonly BASE_API_URL = `${environment.baseApiUrl}/products`

  getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.BASE_API_URL)
  }

  getProductById(id: number): Observable<Product> {
    return this._http.get<Product>(this.BASE_API_URL + '/' + id)
  }

  createProduct(request: ProductRequest) {
    return this._http.post<MessageResponse>(this.BASE_API_URL, request)
  }

  updateProduct(id: number, request: ProductRequest) {
    return this._http.put<MessageResponse>(this.BASE_API_URL + '/' + id, request)
  }

  deleteProduct(id: number) {
    return this._http.delete<MessageResponse>(this.BASE_API_URL + '/' + id)
  }
}
