import { ProductParamsService } from './product-params.service';
import { FilterCriteriaComponent } from './../shared/filter-criteria/filter-criteria.component';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle = 'Product List';

    get showImage(): boolean {
        return this.productParams.showImage;
    }
    set showImage(val: boolean) {
        this.productParams.showImage = val;
    }

    includeDetail: boolean = true;

    imageWidth = 50;
    imageMargin = 2;
    errorMessage = ''

    @ViewChild(FilterCriteriaComponent) filterComp!: FilterCriteriaComponent;

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    constructor(private productService: ProductService,
        private productParams: ProductParamsService,
        private cd: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                if (this.filterComp) {
                    this.filterComp.listFilter = this.productParams.listFilter;
                }
            },
            error: err => this.errorMessage = err
        });
    }

    ngAfterViewInit(): void {
        if (this.filterComp) {
            // as this is gone update the filteredProducts on this comp
            // but change detection completed already on this comp
            // will throw error
            // so using the change detection ref to explicitly tell ng to detect changes.
            this.filterComp.listFilter = this.productParams.listFilter;
            this.cd.detectChanges();
        }
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onFilterChange(filterVal: string): void {
        this.productParams.listFilter = filterVal;
        this.performFilter(filterVal);
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter(product =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }

    onClearClick() {
        this.filterComp.clear();
    }
}
