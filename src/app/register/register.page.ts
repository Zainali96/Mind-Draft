import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DataHelperService } from '../services/data-helper.service';
import { UtilisService } from '../services/utilis.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;


  constructor(public navCtrl:NavController,
    public dataHelper:DataHelperService,
    public utilis:UtilisService,
    public fb: FormBuilder
  ) { 
  }

  back(){
    this.navCtrl.pop();
  }

  onSubmit(){
    if(!this.dataHelper.user.fullName){
      this.utilis.presentToast('Please enter full Name');
    }else{
      if(!this.dataHelper.user.email){
        this.utilis.presentToast('Please enter email');
      }else{
        if(!this.dataHelper.user.password){
          this.utilis.presentToast('Please enter password');
        }else{
          if(!this.dataHelper.user.confirmPassword){
            this.utilis.presentToast('Please enter confirm password');
          }else{
            if(this.registerForm.valid){
              if(this.dataHelper.user.confirmPassword != this.dataHelper.user.password){
                this.utilis.presentToast('Passord and confirm password is not matched')
              }else{
                this.dataHelper.registerUser();
                console.log('user',this.dataHelper.user);
              }
            }
          }
        } 
      }
    }
    
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]

    });
  }

}
