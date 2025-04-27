import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { environment } from 'src/environments/environment';
import { DataHelperService } from './services/data-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  app:any;
  constructor(
    public navctrl:NavController,
    public dataHelper:DataHelperService
  ) {

    console.log('environment',environment.firebase)
    this.app = initializeApp(environment.firebase);
    this.dataHelper.auth = getAuth(this.app);
    this.dataHelper.db = getFirestore(this.app);

    if(localStorage.getItem('uid')){
      this.navctrl.navigateRoot('tab1');
    }else{
      this.navctrl.navigateRoot('/login');
    }
  }
}
