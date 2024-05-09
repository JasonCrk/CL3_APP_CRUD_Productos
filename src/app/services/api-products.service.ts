import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import type { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import type { Product } from '../models/Product';
import { MessageResponse } from '../models/MessageResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {

  private readonly _http = inject(HttpClient)

  private readonly BASE_API_URL = `${environment.baseApiUrl}/products`

  getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.BASE_API_URL)
  }

  deleteProduct(id: number) {
    return this._http.delete<MessageResponse>(this.BASE_API_URL + '/' + id)
  }
}
