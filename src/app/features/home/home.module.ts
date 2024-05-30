import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BannerComponent } from './components/banner/banner.component';
import { GreetingComponent } from './components/greeting/greeting.component';
import { JournalComponent } from './components/journal/journal.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    GreetingComponent,
    JournalComponent,
    OrderSummaryComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})

export class HomeModule { }
