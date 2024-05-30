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

    const deviceId = this.devicesService.deviceId ?? '';
    if (!TruthyCheck.isEmpty(deviceId)) {
      request = request.clone({ headers: request.headers.set('x-device-id', deviceId) });
    }

    const productKey = this.devicesService.productKey ?? '';
    if (!TruthyCheck.isEmpty(productKey)) {
      request = request.clone({ headers: request.headers.set('x-device-product-key', productKey) });
    }

    return next.handle(request);
  }
}
