import { Component, Input } from '@angular/core';
import { OrderSummary } from '../../../../core/models/order/order';
import { StoresService } from '../../../../core/services/stores.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {
  @Input() orderSummary: OrderSummary | undefined;

  constructor(private storesService: StoresService) { }

  store$ = this.storesService.store$;
}
