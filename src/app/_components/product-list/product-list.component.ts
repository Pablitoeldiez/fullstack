import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';
import { UntypedFormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  productSelected!: Product;
  formProduct!: UntypedFormGroup;
  clickedRows = new Set<Product>();
  dataSource!:Product[];
  displayedColumns: string[] = ['NAME', 'CATEGORY', 'PRICE'];
  constructor(
    private productService: ProductService,
    private url: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.listProducts();

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,
      {
        duration: 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass:['blue-snackbar']
      });
  }


  delete(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.listProducts();
      this.openSnackBar('PRODUCT', 'Deleted!')
    });
  }

  listProducts() {
    this.productService.findAllProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
      this.dataSource = data;
    });
  }
}
