import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TruthyCheck } from '../helpers/truthy-check';
import { DevicesService } from '../services/devices.service';
import { StoresService } from '../services/stores.service';

@Injectable()

export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private stores: StoresService, private devicesService: DevicesService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const store = this.stores.store;
    if (store) {
      if (!TruthyCheck.isEmpty(store.id)) {
        request = request.clone({ headers: request.headers.set('x-store-id', store.id) });
      }
    }

    const device = this.devicesService.device;
    if (device) {
      if (!TruthyCheck.isEmpty(device.id)) {
        request = request.clone({ headers: request.headers.set('x-device-id', device.id) });
      }

      if (!TruthyCheck.isEmpty(device.productKey)) {
        request = request.clone({ headers: request.headers.set('x-device-product-key', device.productKey) });
      }
    }

    return next.handle(request);
  }
}
