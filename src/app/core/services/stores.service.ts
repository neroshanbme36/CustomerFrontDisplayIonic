import { Injectable } from '@angular/core';
import { StoreDto } from '../models/store/storeDto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  private storeSrc = new BehaviorSubject<StoreDto | null>(null);
  store$ = this.storeSrc.asObservable();

  constructor() {}

  get store(): StoreDto | null {
    return this.storeSrc.value;
  }

  updateStoreSrc(data: StoreDto | null): void {
    this.storeSrc.next(data);
  }
}
