import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { PeripheralActionEposMiddlewareDto } from '../../models/peripheral_action/peripheralActionEposMiddlewareDto';
import { PeripheralActionSyncCompletedDto } from '../../models/peripheral_action/peripheralActionSyncCompletedDto';

@Injectable({
  providedIn: 'root'
})
export class PeripheralActionsApiService {

  constructor(
    private baseApiService: BaseApiService
  ) { }

  getNewPeripheralActionsByDeviceProductKey(peripheralTypes: string[]): Observable<PeripheralActionEposMiddlewareDto[]> {
    return this.baseApiService.put(`/peripheralActions/new-by-device`, [], peripheralTypes);
  }

  setPeripheralActionsSyncEndedByDeviceProductKey(actionsCompletedDto: PeripheralActionSyncCompletedDto[]): Observable<void> {
    return this.baseApiService.put(`/peripheralActions/set-sync-ended-by-device`, [], actionsCompletedDto);
  }
}
