import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { IonPlatformService } from './core/services/ion-platform.service';
import { IonStorageService } from './core/services/ion-storage.service';
import { ActivatedRoute } from '@angular/router';
import { DevicesService } from './core/services/devices.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerHeight: number | undefined; innerWidth: number | undefined; }; }): void {
    this.ionPlatformService.screenHeight = event.target.innerHeight;
    this.ionPlatformService.screenWidth = event.target.innerWidth;
  }
  
  isInitalTaskCompleted = false;
  private subscriptions = new Subscription();

  constructor(
    private ionPlatformService: IonPlatformService,
    private ionStorageService: IonStorageService,
    private route: ActivatedRoute,
    private devicesService: DevicesService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.ionPlatformService.initAppAsync();
    await this.ionStorageService.initAsync();
    this.setDeviceIdAndProductKey();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private setDeviceIdAndProductKey(): void {
    this.subscriptions.add(
      this.route.queryParams.subscribe(async params => {
        const deviceId= params['deviceId'];
        const productKey= params['productKey'];
        await this.devicesService.setDeviceIdAndProductKeyAsync(deviceId, productKey);
        await this.devicesService.initAsync();
        this.isInitalTaskCompleted = true;
     })
    );
  }
}
