import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataHelperService } from '../services/data-helper.service';
import { UtilisService } from '../services/utilis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage implements OnInit {

  loginForm:FormGroup;

  constructor(public navCtrl:NavController,
    public fb:FormBuilder,
    public dataHelper:DataHelperService,
    public utilis:UtilisService
  ) { 

  }

  goToRegister(){
    this.navCtrl.navigateForward('/register');
  }

  onSubmit(){
    if(!this.dataHelper.user.email){
      this.utilis.presentToast('Please enter email');
    }else{
      if(!this.dataHelper.user.password){
        this.utilis.presentToast('Please enter password');
      }else{
        this.dataHelper.login();
      }
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]]

    });
  }

}
