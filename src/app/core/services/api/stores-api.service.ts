import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreDto } from '../../models/store/storeDto';
import { BaseCrmApiService } from './base-crm-api.service';

@Injectable({
  providedIn: 'root'
})
export class StoresApiService {

  constructor(
    private baseCrmApiService: BaseCrmApiService
  ) { }

  getStore(): Observable<StoreDto> {
    return this.baseCrmApiService.get(`/stores/search-by-device`, []);
  }
}
