import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './_components/product-add/product-add.component';
import { ProductEditComponent } from './_components/product-edit/product-edit.component';
import { ProductListComponent } from './_components/product-list/product-list.component';

const routes: Routes = [
  { path: '',  component: ProductListComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'addProduct', component: ProductAddComponent },
  { path: 'editProduct/:id', component: ProductEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
