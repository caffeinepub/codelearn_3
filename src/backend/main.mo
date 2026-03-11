import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import List "mo:core/List";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

actor {
  // Types
  type Recipe = {
    name : Text;
    ingredients : [Text];
    steps : [Text];
    category : Category;
    cookingTime : Nat; // in minutes
    difficulty : Difficulty;
  };

  type Category = {
    #breakfast;
    #lunch;
    #dinner;
    #snack;
    #dessert;
  };

  type Difficulty = {
    #easy;
    #medium;
    #hard;
  };

  type ChatMessage = {
    sender : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type RecipeMatch = {
    recipe : Recipe;
    matchPercentage : Nat;
  };

  // Data Structures
  let recipes = Map.empty<Text, Recipe>();
  let chatSessions = Map.empty<Text, List.List<ChatMessage>>();

  // Comparison function for sorting RecipeMatch by match percentage
  module RecipeMatch {
    public func compare(a : RecipeMatch, b : RecipeMatch) : Order.Order {
      Nat.compare(b.matchPercentage, a.matchPercentage);
    };
  };

  // Core Functions
  public shared ({ caller }) func addRecipe(name : Text, ingredients : [Text], steps : [Text], category : Category, cookingTime : Nat, difficulty : Difficulty) : async () {
    let recipe : Recipe = {
      name;
      ingredients;
      steps;
      category;
      cookingTime;
      difficulty;
    };
    recipes.add(name, recipe);
  };

  public query ({ caller }) func getRecipe(name : Text) : async Recipe {
    switch (recipes.get(name)) {
      case (null) { Runtime.trap("Recipe not found") };
      case (?recipe) { recipe };
    };
  };

  // Search by name or ingredients
  public query ({ caller }) func searchRecipes(searchText : Text) : async [Recipe] {
    recipes.values().toArray().filter(
      func(recipe) {
        recipe.name.contains(#text searchText) or recipe.ingredients.find(
          func(ingredient) { ingredient.contains(#text searchText) }
        ) != null
      }
    );
  };

  // Filter by category
  public query ({ caller }) func getRecipesByCategory(category : Category) : async [Recipe] {
    recipes.values().toArray().filter(
      func(recipe) { recipe.category == category }
    );
  };

  // Recipe suggestion based on available ingredients
  public query ({ caller }) func getSuggestionsByIngredients(availableIngredients : [Text]) : async [RecipeMatch] {
    let matches = List.empty<RecipeMatch>();

    recipes.values().toArray().forEach(
      func(recipe) {
        let matchesCount = recipe.ingredients.foldRight(
          0,
          func(ingredient, acc) {
            if (availableIngredients.find(func(ai) { ai == ingredient }) != null) {
              acc + 1;
            } else {
              acc;
            };
          },
        );
        let matchPercentage = (matchesCount * 100) / recipe.ingredients.size();
        matches.add({ recipe; matchPercentage });
      }
    );

    matches.toArray().sort().filter(func(match) { match.matchPercentage > 0 });
  };

  // Cooking advice chat
  public shared ({ caller }) func sendMessage(sessionId : Text, sender : Text, message : Text) : async Text {
    let response = processMessage(message);
    let timestamp = Time.now();

    // Add user message
    let userMessage : ChatMessage = {
      sender;
      message;
      timestamp;
    };

    // Add response message
    let responseMessage : ChatMessage = {
      sender = "ChefBot";
      message = response;
      timestamp = Time.now();
    };

    let existingSession = switch (chatSessions.get(sessionId)) {
      case (null) { List.empty<ChatMessage>() };
      case (?session) { session };
    };

    existingSession.add(userMessage);
    existingSession.add(responseMessage);

    chatSessions.add(sessionId, existingSession);

    response;
  };

  // Get chat history for a session
  public query ({ caller }) func getChatHistory(sessionId : Text) : async [ChatMessage] {
    switch (chatSessions.get(sessionId)) {
      case (null) { [] };
      case (?session) { session.reverse().toArray() };
    };
  };

  // Basic rule-based response system
  func processMessage(message : Text) : Text {
    let lowerMessage = message.toLower();

    if (lowerMessage.contains(#text "substitute")) {
      // Example substitution logic
      if (lowerMessage.contains(#text "milk")) {
        return "You can substitute milk with unsweetened oat milk, lactose-free milk, or soy milk.";
      };
    };

    if (lowerMessage.contains(#text "pair") or lowerMessage.contains(#text "combination")) {
      // Example pairing advice
      if (lowerMessage.contains(#text "cilantro")) {
        return "Cilantro pairs well with lime, tomatoes, onions, and spicy flavors.";
      };
    };

    if (lowerMessage.contains(#text "difficulty")) {
      return "Most beginner-friendly dishes have 5 or less ingredients and take under 30 minutes to prepare.";
    };

    "I'm sorry, I couldn't find a specific answer. Please clarify your question or try asking about substitutions, pairings, or difficulty.";
  };

  // Sample data population
  system func preupgrade() {
    // Add sample recipes only if map is empty
    if (recipes.isEmpty()) {
      let sampleRecipes : [(Text, Recipe)] = [
        (
          "Pão de Queijo",
          {
            name = "Pão de Queijo";
            ingredients = ["Tapioca flour", "Cheese", "Eggs", "Milk", "Butter"];
            steps = ["Mix ingredients", "Knead with hands", "Shape into balls", "Bake at 180°C for 10-15 minutes"];
            category = #breakfast;
            cookingTime = 25;
            difficulty = #easy;
          },
        ),
        (
          "Feijoada",
          {
            name = "Feijoada";
            ingredients = ["Black beans", "Pork", "Sausage", "Rice", "Onion", "Garlic"];
            steps = [
              "Cook beans with pork",
              "Season with onion and garlic",
              "Serve with rice",
            ];
            category = #lunch;
            cookingTime = 120;
            difficulty = #hard;
          },
        ),
        (
          "Brigadeiro",
          {
            name = "Brigadeiro";
            ingredients = ["Condensed milk", "Cocoa powder", "Butter", "Chocolate sprinkles"];
            steps = [
              "Mix condensed milk with cocoa powder and butter",
              "Cook until thickened",
              "Cool and shape into balls",
              "Cover with chocolate sprinkles",
            ];
            category = #dessert;
            cookingTime = 20;
            difficulty = #easy;
          },
        ),
        (
          "Moqueca",
          {
            name = "Moqueca";
            ingredients = ["Fish", "Coconut milk", "Bell pepper", "Onion", "Tomato"];
            steps = [
              "Marinate fish in lime juice",
              "Layer with vegetables in a pot",
              "Cook gently in coconut milk",
            ];
            category = #dinner;
            cookingTime = 40;
            difficulty = #medium;
          },
        ),
        (
          "Tapioca",
          {
            name = "Tapioca";
            ingredients = ["Tapioca flour", "Water", "Cheese"];
            steps = [
              "Hydrate tapioca flour",
              "Spread on pan and cook",
              "Fill with cheese and fold",
            ];
            category = #breakfast;
            cookingTime = 10;
            difficulty = #easy;
          },
        ),
        (
          "Coxinha",
          {
            name = "Coxinha";
            ingredients = ["Chicken", "Dough", "Cream cheese", "Breadcrumbs", "Flour", "Eggs"];
            steps = [
              "Cook chicken and mix with cream cheese",
              "Shape into teardrops",
              "Bread and fry",
            ];
            category = #snack;
            cookingTime = 60;
            difficulty = #medium;
          },
        ),
        (
          "Farofa",
          {
            name = "Farofa";
            ingredients = ["Cassava flour", "Bacon", "Onion", "Butter"];
            steps = ["Fry bacon", "Add onion", "Mix in cassava flour"];
            category = #lunch;
            cookingTime = 15;
            difficulty = #easy;
          },
        ),
        (
          "Bolo de Cenoura",
          {
            name = "Bolo de Cenoura";
            ingredients = ["Carrot", "Flour", "Sugar", "Eggs", "Chocolate"];
            steps = [
              "Blend carrots and eggs",
              "Mix with flour and sugar",
              "Bake and cover with chocolate",
            ];
            category = #dessert;
            cookingTime = 45;
            difficulty = #medium;
          },
        ),
        (
          "Açaí Bowl",
          {
            name = "Açaí Bowl";
            ingredients = ["Açaí pulp", "Banana", "Granola", "Fruit"];
            steps = [
              "Blend açaí with banana",
              "Top with granola and fruit",
            ];
            category = #breakfast;
            cookingTime = 10;
            difficulty = #easy;
          },
        ),
        (
          "Escondidinho",
          {
            name = "Escondidinho";
            ingredients = ["Cassava", "Beef", "Cheese", "Milk", "Butter"];
            steps = [
              "Cook and mash cassava",
              "Layer with beef",
              "Bake with cheese topping",
            ];
            category = #dinner;
            cookingTime = 60;
            difficulty = #medium;
          },
        ),
      ];

      sampleRecipes.forEach(
        func((name, recipe)) {
          recipes.add(name, recipe);
        }
      );
    };
  };
};
