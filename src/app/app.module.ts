import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import{ShoppingListPage} from '../pages/shopping-list/shopping-list'
import{RecipesPage} from '../pages/recipes/recipes'
import{TabsPage} from '../pages/tabs/tabs'
import{RecipePage} from '../pages/recipe/recipe'
import{EditRecipePage} from '../pages/edit-recipe/edit-recipe'
import { ShoppingListService } from "../services/shopping-list";
import { recipesService } from "../services/recipe";
import{SignupPage} from '../pages/signup/signup'
import{SigninPage} from '../pages/signin/signin'

import { authService } from "../services/auth";
import{SlOptionPage} from '../pages/shopping-list/sl-option/sl-option'

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipesPage,

RecipePage,
EditRecipePage,
SignupPage,
SigninPage,
SlOptionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,

    ShoppingListPage,
    RecipesPage,
RecipePage,
EditRecipePage,
SignupPage,
SigninPage,
SlOptionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    recipesService,
    authService
  ]
})
export class AppModule {}
