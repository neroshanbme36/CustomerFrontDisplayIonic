import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { Order } from '../../models/order/order';

@Injectable({
  providedIn: 'root'
})
export class TransactionsApiService {

  constructor(
    private baseApiService: BaseApiService
  ) { }

  getTransaction(id: number): Observable<Order> {
    return this.baseApiService.get(`/transactions/epos/${id}`, []);
  }
}
