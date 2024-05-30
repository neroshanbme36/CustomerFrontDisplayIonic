import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesApiService {

  constructor(
    private baseApiService: BaseApiService
  ) { }

  getBannersUrl(storeGuid: string): Observable<string[]> {
    return this.baseApiService.get(`/images/customer-facing-display/banners-url/${storeGuid}`, []);
  }
}
