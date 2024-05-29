import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class IonAlertService {

    constructor(private alertController: AlertController) { }

    async showAlertAsync(messageParam: string, headerParam: string = 'Alert') {
        const alert = await this.alertController.create({
            header: headerParam,
            message: messageParam,
            buttons: ['Ok'],
            backdropDismiss: false
        });

        await alert.present();
    }

    async showAlertWithoutBtnAsync(messageParam: string, headerParam: string = 'Alert') {
      const alert = await this.alertController.create({
          header: headerParam,
          message: messageParam,
          backdropDismiss: false
      });

      await alert.present();
    }

    async showConfirmAsync(messageParam: string, okHandler: any,  cancelHandler: any,
      headerParam: string = 'Confirm!',  okTxt: string = 'Ok', cancelTxt: string = 'Cancel') {
        const alert = await this.alertController.create({
            header: headerParam,
            message: messageParam,
            buttons: [
                {
                    text: okTxt,
                    role: 'ok',
                    id: 'confirm-button',
                    handler: okHandler
                },
                {
                    text: cancelTxt,
                    role: 'cancel',
                    id: 'cancel-button',
                    handler: cancelHandler
                }
            ],
            backdropDismiss: false
        });

        await alert.present();
    }
}
