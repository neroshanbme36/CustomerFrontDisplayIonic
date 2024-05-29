import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, isPlatform } from '@ionic/angular';

const getConfig = () => {
  let config = {
    // animated: false
  };

  if (isPlatform('android')) {
    config = {
      ...config,
      hardwareBackButton: true
    };
  }

  return config;
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //IonicModule
    IonicModule.forRoot(getConfig()) // <-- for child routing issues
  ]
})

export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
