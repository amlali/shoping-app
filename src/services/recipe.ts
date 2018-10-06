import {Recipes} from '../models/recipes'
import {Ingredient} from '../models/ingredient'
export class recipesService{
  recipesServiceList:Recipes[]=[];

  addRecipes(title:string,description:string,difficulty:string,ingredients:Ingredient[]){
    this.recipesServiceList.push(new Recipes(title,description,difficulty,ingredients));
   console.log(this.recipesServiceList);
  }
  getRecipes(){
  return this.recipesServiceList.slice();
  }
  updateRecipes(index:number,title:string,description:string,difficulty:string,ingredients:Ingredient[]){
    this.recipesServiceList[index]=new Recipes(title,description,difficulty,ingredients);
  }
  removeRecipe(index:number){
    this.recipesServiceList.splice(index);
  }
}
