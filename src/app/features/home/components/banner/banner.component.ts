import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreDto } from '../../../../core/models/store/storeDto';
import { ImagesApiService } from '../../../../core/services/api/images-api.service';
import { StoresService } from '../../../../core/services/stores.service';
import { IonAlertService } from '../../../../core/services/ui/ion-alert.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {
  banners: string[] = [];
  private subscriptions = new Subscription();

  constructor(
    private imagesApiService: ImagesApiService,
    private ionAlertService: IonAlertService,
    private storesService: StoresService
  ) { }

  ngOnInit(): void {
    this.bindBehaviourSubjects();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private bindBehaviourSubjects(): void {
    this.subscriptions.add(
      this.storesService.store$.subscribe({
        next: (data: StoreDto | null) => {
          const storeGuid = data?.guid;
          if (storeGuid) {
            this.bindBannersUrl(storeGuid);
          }
        }
      })
    );
  }

  private bindBannersUrl(storeGuid: string): void {
    this.imagesApiService.getBannersUrl(storeGuid)
      .subscribe({
        next: (response: string[]) => {
          this.banners = response;
        },
        error: (error) => {
          this.ionAlertService.showAlertAsync(error);
        }
      });
  }
}
