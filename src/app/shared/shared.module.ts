import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StarComponent } from './star.component';
import { FilterCriteriaComponent } from './filter-criteria/filter-criteria.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    StarComponent,
    FilterCriteriaComponent
  ],
  exports: [
    StarComponent,
    CommonModule,
    FormsModule,
    FilterCriteriaComponent
  ]
})
export class SharedModule { }
