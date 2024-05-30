import { Component, OnInit } from '@angular/core';
import { StoreDto } from '../../../../core/models/store/storeDto';
import { StoresApiService } from '../../../../core/services/api/stores-api.service';
import { StoresService } from '../../../../core/services/stores.service';
import { IonAlertService } from '../../../../core/services/ui/ion-alert.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements OnInit {

  constructor(
    private storesApiService: StoresApiService,
    private ionAlertService: IonAlertService,
    private storesService: StoresService
  ) { }

  ngOnInit(): void {
    this.bindStore();
  }  

  private bindStore(): void {
    this.storesApiService.getStore()
    .subscribe({
      next: (response: StoreDto) => {
        this.storesService.updateStoreSrc(response);
      }, error: (error) => {
        this.ionAlertService.showAlertAsync(error);
      }
    });
  }
}
