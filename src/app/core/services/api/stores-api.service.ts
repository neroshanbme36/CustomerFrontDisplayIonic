import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { StoreDto } from '../../models/store/storeDto';

@Injectable({
  providedIn: 'root'
})
export class StoresApiService {

  constructor(
    private baseApiService: BaseApiService
  ) { }

  getStore(): Observable<StoreDto> {
    return this.baseApiService.get(`/stores/search-by-device`, []);
  }
}
