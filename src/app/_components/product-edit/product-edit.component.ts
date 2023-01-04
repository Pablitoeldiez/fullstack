import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product!: Product;
  idProduct: any;
  productUpdate!: Product;
  formProduct!: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,

  ) { }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,
      {
        duration: 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass:['blue-snackbar']
      });
  }
  update() {
    this.productUpdate = new Product();
    this.productUpdate.id = this.formProduct.value.id;
    this.productUpdate.name = this.formProduct.value.nameP;
    this.productUpdate.description = this.formProduct.value.description;
    this.productUpdate.price = this.formProduct.value.price;

    this.productService.editProduct(this.productUpdate).subscribe((data) => {
      this.openSnackBar('PRODUCT', 'Updated!');
    });
    this.router.navigate(['/products']);

  }
  initFormProduct(product: Product) {
    this.formProduct = new FormGroup({
      id: new FormControl(product.id),
      nameP: new FormControl(product.name),
      description: new FormControl(product.description),
      price: new FormControl(product.price)
    });
  }
  fillProduct() {
    this.idProduct = this.route.snapshot.params['id'];
    this.productService.findById(this.idProduct).subscribe((data: Product) => {

      this.initFormProduct(data);

      console.log(this.product);
    });
  }

  ngOnInit(): void {
    this.formProduct;
    this.fillProduct();

  }
}
