import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TruthyCheck } from '../helpers/truthy-check';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error) {
                    let errorMessage = '';
                    switch (error.status) {
                        case 0:
                            errorMessage = 'Your network is unavailable. Please check your data or wifi connection and try again';
                            break;
                        case 400:
                            if (error.error.errors) {
                                error.error.errors.forEach((err: string) => {
                                    errorMessage += `${err} <br/>`;
                                });
                            } else {
                                errorMessage = error.error.message;
                            }
                            break;
                        case 401:
                            errorMessage = error.error.message;
                            break;
                        case 404:
                            errorMessage = error.error.message;
                            break;
                        case 500:
                            errorMessage = error.error.message;
                            break;
                        case 503:
                            errorMessage = 'Service Unavailable';
                            break;
                        case 504:
                            errorMessage = error.statusText;
                            break;
                        default:
                            errorMessage = 'Something unexpected went wrong';
                            break;
                    }

                    if (!TruthyCheck.isEmpty(errorMessage)) {
                        return throwError(() => errorMessage);
                    }
                }
                return throwError(() => error);
            })
        );
    }
}
