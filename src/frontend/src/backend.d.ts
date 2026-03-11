import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ChatMessage {
    sender: string;
    message: string;
    timestamp: Time;
}
export interface RecipeMatch {
    matchPercentage: bigint;
    recipe: Recipe;
}
export interface Recipe {
    cookingTime: bigint;
    difficulty: Difficulty;
    name: string;
    steps: Array<string>;
    category: Category;
    ingredients: Array<string>;
}
export type Time = bigint;
export enum Category {
    dessert = "dessert",
    breakfast = "breakfast",
    lunch = "lunch",
    snack = "snack",
    dinner = "dinner"
}
export enum Difficulty {
    easy = "easy",
    hard = "hard",
    medium = "medium"
}
export interface backendInterface {
    addRecipe(name: string, ingredients: Array<string>, steps: Array<string>, category: Category, cookingTime: bigint, difficulty: Difficulty): Promise<void>;
    getChatHistory(sessionId: string): Promise<Array<ChatMessage>>;
    getRecipe(name: string): Promise<Recipe>;
    getRecipesByCategory(category: Category): Promise<Array<Recipe>>;
    getSuggestionsByIngredients(availableIngredients: Array<string>): Promise<Array<RecipeMatch>>;
    searchRecipes(searchText: string): Promise<Array<Recipe>>;
    sendMessage(sessionId: string, sender: string, message: string): Promise<string>;
}
