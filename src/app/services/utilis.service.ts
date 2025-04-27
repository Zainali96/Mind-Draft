import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilisService {

  loading:any;

  constructor(public loadingCtrl:LoadingController,
    public toastController:ToastController
  ) { }

  async showLoader() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'crescent'
    });

    this.loading.present();
  }

  hideLoader(){
    this.loading.dismiss();
  }

  async presentToast(mess) {
    const toast = await this.toastController.create({
      message: mess,
      duration: 3000,
      position: 'bottom',
    });

    await toast.present();
  }
}
