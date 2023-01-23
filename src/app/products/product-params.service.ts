import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductParamsService {
  showImage: boolean = false;
  listFilter: string = '';

  constructor() { }
}
