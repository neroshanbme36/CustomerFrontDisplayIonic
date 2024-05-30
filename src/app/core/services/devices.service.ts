import { Injectable } from '@angular/core';
import { DeviceDto } from '../models/device/deviceDto';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private _device: DeviceDto | null;
  
  constructor() {
    this._device = {id: 'DE1141', productKey: 'Epos'} as DeviceDto;
  }

  get device(): DeviceDto | null {
    return this._device;
  }
}
