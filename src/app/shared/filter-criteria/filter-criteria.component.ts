import { EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'pm-filter-criteria',
    templateUrl: './filter-criteria.component.html',
    styleUrls: ['./filter-criteria.component.css']
})
export class FilterCriteriaComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() displayDetail: boolean = false;
    @Input() hitCount: number | undefined;
    hitMsg: string = '';

    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    _listFilter: string = '';
    get listFilter() {
        return this._listFilter;
    }
    set listFilter(val: string) {
        this._listFilter = val;
        this.valueChange.emit(val);
    }

    @ViewChild('filterElement') filterElementRef!: ElementRef;

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['hitCount'].currentValue && changes['hitCount'].currentValue > 0) {
            this.hitMsg = 'HitCount : ' + this.hitCount;
        } else {
            this.hitMsg = ' No Match Found';
        }
    }

    ngAfterViewInit(): void {
        if (this.filterElementRef) {
            this.filterElementRef.nativeElement.focus();
        }
    }

    clear() {
        this.listFilter = '';
    }

}
