import { Injectable } from '@angular/core';
import { StoreDto } from '../models/store/storeDto';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  private _store: StoreDto | null;

  constructor() {
    this._store = { id: 'ST9998', name: 'test' } as StoreDto;
  }

  get store(): StoreDto | null {
    return this._store;
  }
}
