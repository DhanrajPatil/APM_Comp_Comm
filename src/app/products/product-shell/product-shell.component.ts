import { ProductService } from './../product.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit, OnDestroy {
    pageTitle = 'Products';
    monthCount = 0;
    sub!: Subscription;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.sub = this.productService.selectedProductChanges$.subscribe(
            product => {
                if(product) {
                    let now = new Date();
                    let release = new Date(product.releaseDate);
                    this.monthCount = (now.getMonth() - release.getMonth()) + (12 * (now.getFullYear() - release.getFullYear()));
                } else {
                    this.monthCount = 0;
                }
            }
        )
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
