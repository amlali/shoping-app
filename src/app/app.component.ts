import { Component,ViewChild } from '@angular/core';
import { NavController,MenuController } from "ionic-angular";
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import{RecipesPage} from '../pages/recipes/recipes'
import{TabsPage} from '../pages/tabs/tabs'
import{SignupPage} from '../pages/signup/signup'
import{SigninPage} from '../pages/signin/signin'
import {authService} from '../services/auth'

import firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = TabsPage;
    signupPage = SignupPage;
      signinPage = SigninPage;
      isAuthenticated=false;
@ViewChild('nav') nav:NavController
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private menuCtrl:MenuController,
    private authServ:authService) {
    firebase.initializeApp({
      apiKey: "AIzaSyBU1JE4atR8GZbi0FpUD7srUN-hxmOUUJo",
    authDomain: "ion-recipe-book-56ab1.firebaseapp.com",
    databaseURL: "https://ion-recipe-book-56ab1.firebaseio.com"

  });
  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      this.isAuthenticated=true;
      this.rootPage=TabsPage;
    }
    else{
      this.isAuthenticated=false;
      this.rootPage=SigninPage;
    }

  });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page:any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
  onLogOut(){
     this.authServ.logout();
     this.menuCtrl.close();
     this.nav.setRoot(SigninPage);

  }
}
