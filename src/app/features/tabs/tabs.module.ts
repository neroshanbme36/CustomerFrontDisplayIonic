import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TabsPage],
  imports: [
    CommonModule,
    TabsPageRoutingModule,
    SharedModule
  ],
})
export class TabsPageModule {}
