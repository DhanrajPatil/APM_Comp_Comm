import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
    selector: 'pm-product-shell-list',
    templateUrl: './product-shell-list.component.html',
    styleUrls: ['./product-shell-list.component.css']
})
export class ProductShellListComponent implements OnInit, OnDestroy {
    pageTitle = 'Products';
    products: IProduct[] = [];
    selectedProduct!: IProduct | null;
    errorMessage = '';
    sub!: Subscription;

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.sub = this.productService.selectedProductChanges$.subscribe(
            product => this.selectedProduct = product
        );
        this.productService.getProducts().subscribe({
            next: products => 
                this.products = products,
            error: err => this.errorMessage = err
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onProductSelected(product: IProduct, index: number) {
        this.productService.setSelectedProduct(product);
    }
}
