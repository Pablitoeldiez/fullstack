import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Product } from '../_models/product';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = `http://localhost:8082/api/products`;
  constructor(private http: HttpClient) { }

  findAllProducts(): Observable<any[]> {
    return this.http.get<Product[]>(this.url);
  }
  addProduct(product: Product): Observable<Product> {
   // alert(JSON.stringify(product));
    return this.http.post<Product>(this.url, product);
  }
  editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.url, product);
  }
  deleteProduct(id: number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`);
  }
  findById(id: string):Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`);
  }
}
