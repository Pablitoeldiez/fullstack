import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../_models/category';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = `http://localhost:8082/api/categories`;
  constructor(private http: HttpClient) { }

  findAllCategories(): Observable<any[]> {
    return this.http.get<Category[]>(this.url);
  }
}
