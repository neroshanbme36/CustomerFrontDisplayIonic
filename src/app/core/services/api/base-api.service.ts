import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CustomApiParams } from '../../models/customApiParams';

@Injectable({
  providedIn: 'root'
})

export class BaseApiService {
  private apiDomain = environment.API_URL;

  constructor(private httpClient: HttpClient) { }

  post<T>(url: string, customApiParams: CustomApiParams[], requestModel: any): Observable<T> {
    const options = this.getHttpOptions(customApiParams);
    return this.httpClient.post<T>(this.apiDomain + url, requestModel, options);
  }

  put<T>(url: string, customApiParams: CustomApiParams[], requestModel: any): Observable<T> {
    const options = this.getHttpOptions(customApiParams);
    return this.httpClient.put<T>(this.apiDomain + url, requestModel, options);
  }

  get<T>(url: string, customApiParams: CustomApiParams[]): Observable<T> {
    const options = this.getHttpOptions(customApiParams);
    return this.httpClient.get<T>(this.apiDomain + url, options);
  }

  delete<T>(url: string, customApiParams: CustomApiParams[]): Observable<T> {
    const options = this.getHttpOptions(customApiParams);
    return this.httpClient.delete<T>(this.apiDomain + url, options);
  }

  private getHttpParams<T>(apiRequest: any): HttpParams {
    const params = Object.getOwnPropertyNames(apiRequest).reduce(
      (p, key) => p.set(key, apiRequest[key]),
      new HttpParams()
    );
    return params;
  }

  private getApiRequestparams<T>(customApiParams: CustomApiParams[]): any {
    const apiRequest = {} as any;

    if (customApiParams) {
      customApiParams.forEach((element) => {
        if (element.key) {
          apiRequest[element.key] = element.value;
        }
      });
    }
    return apiRequest;
  }

  private getHttpOptions(customParams: CustomApiParams[]) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: this.getHttpParams(this.getApiRequestparams(customParams)),
    };
  }
}
