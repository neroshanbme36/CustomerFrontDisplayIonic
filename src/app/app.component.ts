import { Component, HostListener, OnInit } from '@angular/core';
import { IonPlatformService } from './core/services/ion-platform.service';
import { IonStorageService } from './core/services/ion-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerHeight: number | undefined; innerWidth: number | undefined; }; }): void {
    this.ionPlatformService.screenHeight = event.target.innerHeight;
    this.ionPlatformService.screenWidth = event.target.innerWidth;
  }
  
  constructor(
    private ionPlatformService: IonPlatformService,
    private ionStorageService: IonStorageService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.ionPlatformService.initAppAsync();
    await this.ionStorageService.initAsync();
  }
}
