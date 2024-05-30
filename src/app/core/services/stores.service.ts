import { Injectable } from '@angular/core';
import { StoreDto } from '../models/store/storeDto';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  store: StoreDto | null;

  constructor() {
    this.store = null;
  }
}
