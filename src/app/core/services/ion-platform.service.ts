import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { PwaService } from './pwa.service';
import { VersionControl } from '../helpers/version-control';
import { IonAlertService } from './ui/ion-alert.service';
import { PreviousRouteService } from './previous-route.service';

@Injectable({
  providedIn: 'root'
})
export class IonPlatformService {
  screenWidth: number | undefined;
  screenHeight: number | undefined;
  private _platformType: string | undefined; // ios, android, web, ''
  private _appInstalledVersion: string | undefined;
  private isExistAlertBoxShown: boolean | undefined;

  constructor(
    private platform: Platform,
    //private pwaService: PwaService,
    private ionAlertService: IonAlertService,
    private previousRouteService: PreviousRouteService
  ) 
  {
    this.setScreenSize();
  }

  get appInstalledVersion(): string | undefined {
    return this._appInstalledVersion;
  }

  get platformType(): string {
    return this._platformType ?? '';
  }

  async initAppAsync(): Promise<void> {
    await this.platform.ready();
    this.setPlatformType();
    this._appInstalledVersion = VersionControl.getAppInstalledVersion(this.platformType);
    if (this.platformType === 'web') {
      //this.pwaService.checkForUpdates();
      return;
    }
    this.hardwareBackBtnHandler();
  }

  private hardwareBackBtnHandler(): void {
    this.platform.backButton.subscribe(async () => {
      // if menu open close
      // this.modalCtrl.dismiss();
      if (!this.isExistAlertBoxShown) {
        const currentUrlUpper = this.previousRouteService.currentUrl.trim().toUpperCase();
        if (currentUrlUpper === '/TABS/HOME') {
          this.isExistAlertBoxShown = true;
          await this.ionAlertService
            .showConfirmAsync('Do you want to exit?', () => {(navigator as any).app.exitApp()},
            () => { this.isExistAlertBoxShown = false; }, 'Exit', 'exit');
        }
      }
    });
  }

  private setPlatformType(): void {
    let platformType = 'web';
    if (this.platform.is('android') || this.platform.is('ios')) {
      if (!this.platform.is('mobileweb') && !this.platform.is('pwa')) {
        if (this.platform.is('android')) {
          platformType = 'android';
        } else if (this.platform.is('ios')) {
          platformType = 'ios';
        } else {
          platformType = '';
        }
      }
    }
    this._platformType = platformType;
  }

  private setScreenSize(): void {
    this.screenHeight = window.screen.height;
    this.screenWidth = window.screen.width;
  }
}
