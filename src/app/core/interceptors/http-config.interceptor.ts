import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TruthyCheck } from '../helpers/truthy-check';

@Injectable()

export class HttpConfigInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if (!TruthyCheck.isEmpty(this.devicesService.selectedDeviceId)) {
    //   request = request.clone({ headers: request.headers.set('x-device-id', this.devicesService.selectedDeviceId) });
    // }

    return next.handle(request);
  }
}
