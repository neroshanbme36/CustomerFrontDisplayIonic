import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    // ReactiveFormsModule,
    IonicModule,
    RouterModule, // check
  ],
  exports: [
    //ReactiveFormsModule,
    IonicModule,
  ],
  providers: []
})

export class SharedModule { }
