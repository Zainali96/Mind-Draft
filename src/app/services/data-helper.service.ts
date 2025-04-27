import { Injectable } from '@angular/core';
import { 
  getAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc, doc, setDoc,  } from 'firebase/firestore/lite';
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL } from 'firebase/storage';
import { User } from '../models/User';
import { UtilisService } from './utilis.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataHelperService {

  db:any;
  auth:any;
  openCalendar:boolean = false
  user:User = new User();

  constructor(public utilis:UtilisService,
    public navCtrl:NavController
  ) { 
    
  }

  onCalendarCancel(event){
    this.openCalendar = false
  }

  onCalendarConfirm(event){
    this.openCalendar = false;
    this.user.dateOfBirth = moment(event.detail.value).format('DD-MM-YYYY');
    console.log('confirm',event);
  }

  async uploadImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });

    // this.user.profileImage = 'data:image/png;base64,'+ image.base64String;
    // image.base64String, `image/${image.format}`

    if (image.dataUrl) {
      this.utilis.showLoader();

      await this.uploadBase64Image(image.dataUrl, `photo_${Date.now()}.jpg`);
    }

  }

  async uploadBase64Image(base64Data: string, fileName: string) {
    const storage = getStorage();
    const storageRef = ref(storage, `users/${fileName}`);
    try {
      await uploadString(storageRef, base64Data, 'data_url');
      console.log('Base64 image uploaded!');
  
      const downloadUrl = await getDownloadURL(storageRef);
      console.log('Download URL:', downloadUrl);
      this.user.profileImage = downloadUrl;
      this.utilis.hideLoader();    
    } catch (error) {
      this.utilis.hideLoader();
      console.error('Error uploading base64 image:', error);
    }
  }

  async registerUser(){
    this.utilis.showLoader();
    let userCredentials = await createUserWithEmailAndPassword(this.auth, this.user.email, this.user.password);
    if(userCredentials){
      localStorage.setItem('uid',userCredentials.user.uid);
      this.user.uid = userCredentials.user.uid;
      this.utilis.hideLoader();
      this.navCtrl.navigateRoot('tab1');
      this.saveUserData();
      
    }else{
      this.utilis.hideLoader();
    }

    console.log('user credentials',userCredentials);
  }

  async login(){
    this.utilis.showLoader();
    let userCredentials = await signInWithEmailAndPassword(this.auth,this.user.email,this.user.password);
    if(userCredentials){
      localStorage.setItem('uid',userCredentials.user.uid);
      this.user.uid = userCredentials.user.uid;
      this.getUserData();
      
    }else{
      this.utilis.hideLoader();
    }
  }

  async saveUserData(){
    try {
      delete this.user.password;
      delete this.user.confirmPassword;
      const userDoc = doc(this.db, "users", this.user.uid);
      await setDoc(userDoc,  { ...this.user });
      
    } catch (error) {
      this.utilis.hideLoader();
      console.log('error',error);
    }
  }

  async getUserData(){
    const userDoc = doc(this.db, "users", this.user.uid);
    const userData:any = await getDoc(userDoc); 

    if(userData){
      this.user = userData.data();
      this.utilis.hideLoader();
      console.log('user Data',this.user);
      this.navCtrl.navigateRoot('tab1');
    }
  }

  async logout(){
    this.user = new User();
    this.utilis.showLoader();
    await signOut(this.auth);
    localStorage.removeItem('uid');
    setTimeout(a => {
      this.utilis.hideLoader()
      this.navCtrl.navigateRoot('login');
    },500);
  }
}
