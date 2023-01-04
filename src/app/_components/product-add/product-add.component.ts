import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/_services/category.service';
import { Category } from 'src/app/_models/category';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  formProduct!: UntypedFormGroup;
  product!: Product;
  categories!: Category[];
  color = 'accent';
  checked = true;
  disabled = false;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  action() {
    let product = new Product();
    //product.id = this.formProduct.value.id;
    product.name = this.formProduct.value.name;
    product.description = this.formProduct.value.description;
    product.price = this.formProduct.value.price;
    product.category = this.formProduct.value.category;
    product.active = this.formProduct.value.isActive;
    if (this.formProduct.invalid) {
      return;
    } else {
      this.addProduct(product);
    }

  }
  listCategories() {
    this.categoryService.findAllCategories().subscribe((data) => {
      console.log(data);
      this.categories = data;
    });
  }
  initForm() {
    this.listCategories();
    this.formProduct = new FormGroup({
      category: new FormControl(Validators.minLength(5)),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      price: new FormControl('',Validators.required),
      isActive: new FormControl(true),
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,
      {
        duration: 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['blue-snackbar']
      });
  }
  private addProduct(product: Product) {

    this.productService.addProduct(product).subscribe(() => {
      this.openSnackBar('PRODUCT', 'Created!')
      console.log("Product saved.");
      this.router.navigate(["/products"]);
    })

  }

  ngOnInit(): void {
    this.initForm();

  }
}
