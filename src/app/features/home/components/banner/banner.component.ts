import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
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
  currentBannerUrl = '';
  private bannersUrl: string[] = [];
  private currentBannerIdx = 0;
  private subscriptions = new Subscription();

  constructor(
    private imagesApiService: ImagesApiService,
    private ionAlertService: IonAlertService,
    private storesService: StoresService
  ) { }

  ngOnInit(): void {
    this.bindBehaviourSubjects();
    this.slideshow();
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
          this.bannersUrl = response;
        },
        error: (error) => {
          this.ionAlertService.showAlertAsync(error);
        }
      });
  }

  private slideshow(): void {
    const source = timer(1000, 1000 * 5);
    this.subscriptions.add(
      source.subscribe(val => {
        if (this.bannersUrl.length > 0) {
          this.currentBannerUrl = this.bannersUrl[this.currentBannerIdx];
          //this.currentBannerUrl = 'https://www.creativefabrica.com/wp-content/uploads/2023/03/14/American-Craft-Storefront-64308619-1.png';
          if (this.currentBannerIdx < (this.bannersUrl.length - 1)) {
            this.currentBannerIdx++;
          } else {
            this.currentBannerIdx = 0;
          }
        }
      })
    );
  }
}
