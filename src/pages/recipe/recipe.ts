import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Recipes} from '../../models/recipes';
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import {ShoppingListService} from '../../services/shopping-list';
import {recipesService} from '../../services/recipe';

import{ShoppingListPage} from '../shopping-list/shopping-list';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})

export class RecipePage implements OnInit{
  index:number;
  recipe:Recipes;
  constructor(public navCtrl: NavController, public navParams: NavParams
  ,private shoppingServce:ShoppingListService,
private recipesServ:recipesService) {
  }

ngOnInit(){
  this.recipe=this.navParams.get('recipe');
  this.index=this.navParams.get('index');
}
  onEditRecipe(){
this.navCtrl.push(EditRecipePage,{mode:"Edit",recipe:this.recipe,index:this.index});
  }
  onAddIngredients(){
    this.shoppingServce.addItems(this.recipe.ingredients);
    this.navCtrl.push(ShoppingListPage)
  }
  onDeleteRecipe(){
    this.recipesServ.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
