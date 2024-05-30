import { Injectable } from '@angular/core';
import { IonStorageService } from './ion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private _deviceId: string | null;
  private _productKey: string | null;
  
  constructor(
    private ionStorageService: IonStorageService
  ) {
    this._deviceId = null;
    this._productKey = null;
  }

  get deviceId(): string | null {
    return this._deviceId;
  }

  get productKey(): string | null {
    return this._productKey;
  }

  async initAsync(): Promise<void> {
    this._deviceId = await this.ionStorageService.getAsync('deviceId');
    this._productKey = await this.ionStorageService.getAsync('productKey');
  }

  async setDeviceIdAndProductKeyAsync(deviceId: string | null, productKey: string | null): Promise<void> {
    if (deviceId) {
      await this.ionStorageService.setAsync('deviceId', deviceId);
      this._deviceId = deviceId;
    }
    if (productKey) {
      await this.ionStorageService.setAsync('productKey', productKey);
      this._productKey = productKey;
    }
  }
}
