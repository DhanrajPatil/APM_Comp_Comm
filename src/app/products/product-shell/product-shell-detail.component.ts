import { IProduct } from './../product';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle = 'Product Detail';
    sub!: Subscription;
    product!: IProduct | null;

    errorMessage = '';

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.sub = this.productService.selectedProductChanges$.subscribe(
            product => this.product = product
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
