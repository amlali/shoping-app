import { Component } from '@angular/core';
import { NavController } from "ionic-angular";

import { EditRecipePage } from "../edit-recipe/edit-recipe";

import { RecipePage } from "../recipe/recipe";
import {recipesService} from '../../services/recipe';
import {Recipes} from '../../models/recipes';


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})

export class RecipesPage {
  recipes:Recipes[];
  constructor(public navCtrl: NavController,
  private recipeServ:recipesService) {
  }

ionViewWillEnter(){
  this.recipes=this.recipeServ.getRecipes();
}
  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }
onLoadRecipe(recipe:Recipes, i:number){
  this.navCtrl.push(RecipePage,{recipe:recipe,index:i});
}


}
