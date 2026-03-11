import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, ChefHat, Clock, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Recipe } from "../backend.d";
import { Category, Difficulty } from "../backend.d";
import { useSearchRecipes } from "../hooks/useQueries";

const CATEGORY_LABELS: Record<string, string> = {
  all: "Todos",
  [Category.breakfast]: "Café da Manhã",
  [Category.lunch]: "Almoço",
  [Category.dinner]: "Jantar",
  [Category.snack]: "Lanche",
  [Category.dessert]: "Sobremesa",
};

const DIFFICULTY_LABELS: Record<string, string> = {
  [Difficulty.easy]: "Fácil",
  [Difficulty.medium]: "Médio",
  [Difficulty.hard]: "Difícil",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  [Difficulty.easy]: "bg-green-100 text-green-800 border-green-200",
  [Difficulty.medium]: "bg-yellow-100 text-yellow-800 border-yellow-200",
  [Difficulty.hard]: "bg-red-100 text-red-800 border-red-200",
};

const CATEGORY_EMOJIS: Record<string, string> = {
  [Category.breakfast]: "☕",
  [Category.lunch]: "🍽️",
  [Category.dinner]: "🌙",
  [Category.snack]: "🥪",
  [Category.dessert]: "🍰",
};

const CATEGORIES = ["all", ...Object.values(Category)];

const sampleRecipes: Recipe[] = [
  {
    name: "Pão de Queijo Mineiro",
    category: Category.snack,
    cookingTime: 30n,
    difficulty: Difficulty.easy,
    ingredients: [
      "polvilho azedo",
      "queijo minas",
      "ovos",
      "leite",
      "óleo",
      "sal",
    ],
    steps: [
      "Misture os ingredientes secos",
      "Adicione os líquidos e mexa bem",
      "Forme bolinhas",
      "Asse a 180°C por 25 minutos",
    ],
  },
  {
    name: "Frango Assado com Ervas",
    category: Category.dinner,
    cookingTime: 90n,
    difficulty: Difficulty.medium,
    ingredients: [
      "frango inteiro",
      "alecrim",
      "tomilho",
      "alho",
      "limão",
      "azeite",
      "sal",
      "pimenta",
    ],
    steps: [
      "Tempere o frango com ervas e limão",
      "Deixe marinar por 2 horas",
      "Asse a 200°C por 1h20min",
      "Regue com o próprio caldo a cada 30 minutos",
    ],
  },
  {
    name: "Brigadeiro Clássico",
    category: Category.dessert,
    cookingTime: 20n,
    difficulty: Difficulty.easy,
    ingredients: [
      "leite condensado",
      "cacau em pó",
      "manteiga",
      "granulado de chocolate",
    ],
    steps: [
      "Misture leite condensado, cacau e manteiga",
      "Cozinhe em fogo médio mexendo sempre",
      "Ponto de brigadeiro ao soltar do fundo",
      "Enrole e passe no granulado",
    ],
  },
  {
    name: "Tapioca com Queijo e Presunto",
    category: Category.breakfast,
    cookingTime: 10n,
    difficulty: Difficulty.easy,
    ingredients: ["goma de tapioca", "queijo mussarela", "presunto", "sal"],
    steps: [
      "Esquente frigideira sem gordura",
      "Coloque a goma peneirada",
      "Deixe firmar e adicione recheio",
      "Dobre ao meio e sirva quente",
    ],
  },
  {
    name: "Moqueca de Peixe Baiana",
    category: Category.lunch,
    cookingTime: 45n,
    difficulty: Difficulty.medium,
    ingredients: [
      "filé de peixe",
      "leite de coco",
      "azeite de dendê",
      "tomate",
      "cebola",
      "pimentão",
      "coentro",
      "limão",
    ],
    steps: [
      "Tempere o peixe com limão e sal",
      "Refogue cebola, tomate e pimentão",
      "Adicione o peixe e o leite de coco",
      "Finalize com dendê e coentro",
    ],
  },
  {
    name: "Coxinha de Frango",
    category: Category.snack,
    cookingTime: 60n,
    difficulty: Difficulty.hard,
    ingredients: [
      "farinha de trigo",
      "caldo de frango",
      "frango desfiado",
      "cream cheese",
      "cheiro verde",
      "óleo para fritar",
    ],
    steps: [
      "Faça a massa com farinha e caldo",
      "Prepare o recheio com frango e cream cheese",
      "Molde as coxinhas",
      "Frite em óleo quente até dourar",
    ],
  },
];

function RecipeCard({
  recipe,
  index,
  onClick,
}: { recipe: Recipe; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      data-ocid={`receitas.recipe.item.${index + 1}`}
      className="cursor-pointer group"
      onClick={onClick}
    >
      <div className="bg-card rounded-xl border border-border shadow-card hover:shadow-warm transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 flex items-center justify-between">
          <span className="text-3xl">
            {CATEGORY_EMOJIS[recipe.category] || "🍴"}
          </span>
          <Badge
            variant="outline"
            className={`text-xs font-medium ${DIFFICULTY_COLORS[recipe.difficulty] || ""}`}
          >
            {DIFFICULTY_LABELS[recipe.difficulty] || recipe.difficulty}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-display font-semibold text-foreground text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
            {recipe.name}
          </h3>
          <Badge className="bg-secondary text-secondary-foreground border-0 text-xs mb-3">
            {CATEGORY_LABELS[recipe.category] || recipe.category}
          </Badge>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {Number(recipe.cookingTime)} min
            </span>
            <span className="flex items-center gap-1.5">
              <ChefHat className="w-3.5 h-3.5" />
              {recipe.ingredients.length} ingredientes
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RecipeDetailModal({
  recipe,
  onClose,
}: { recipe: Recipe | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {recipe && (
        <Dialog open={!!recipe} onOpenChange={onClose}>
          <DialogContent
            className="max-w-lg max-h-[90vh] flex flex-col p-0 overflow-hidden"
            data-ocid="receitas.recipe_detail.modal"
          >
            <div className="bg-gradient-to-br from-primary/15 to-accent/10 px-6 pt-6 pb-4">
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <span className="text-4xl block mb-2">
                      {CATEGORY_EMOJIS[recipe.category] || "🍴"}
                    </span>
                    <DialogTitle className="font-display text-2xl font-bold text-foreground leading-tight">
                      {recipe.name}
                    </DialogTitle>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge className="bg-secondary text-secondary-foreground border-0">
                    {CATEGORY_LABELS[recipe.category] || recipe.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={DIFFICULTY_COLORS[recipe.difficulty] || ""}
                  >
                    {DIFFICULTY_LABELS[recipe.difficulty] || recipe.difficulty}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-border text-muted-foreground"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {Number(recipe.cookingTime)} min
                  </Badge>
                </div>
              </DialogHeader>
            </div>
            <ScrollArea className="flex-1 overflow-auto">
              <div className="px-6 py-4 space-y-6">
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      🧂
                    </span>
                    Ingredientes
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {recipe.ingredients.map((ing) => (
                      <li
                        key={ing}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      📋
                    </span>
                    Modo de Preparo
                  </h4>
                  <ol className="space-y-3">
                    {recipe.steps.map((step, i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: steps are ordered
                      <li key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/20 text-accent-foreground text-sm font-bold flex items-center justify-center font-display">
                          {i + 1}
                        </span>
                        <p className="text-sm text-foreground leading-relaxed pt-1">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </ScrollArea>
            <div className="px-6 py-4 border-t border-border">
              <Button
                onClick={onClose}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="receitas.recipe_detail.close_button"
              >
                Fechar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

export default function ReceitasTab() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const { data: backendRecipes, isLoading } = useSearchRecipes(search);

  const recipes = useMemo(() => {
    const base =
      backendRecipes && backendRecipes.length > 0
        ? backendRecipes
        : sampleRecipes;
    return activeCategory === "all"
      ? base
      : base.filter((r) => r.category === activeCategory);
  }, [backendRecipes, activeCategory]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar receitas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-card border-border focus-visible:ring-primary/30"
          data-ocid="receitas.search_input"
        />
        {search && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setSearch("")}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat}
            data-ocid="receitas.category.tab"
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? "pill-active"
                : "pill-inactive hover:bg-secondary"
            }`}
          >
            {CATEGORY_EMOJIS[cat] && (
              <span className="mr-1">{CATEGORY_EMOJIS[cat]}</span>
            )}
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {isLoading && (
        <div
          data-ocid="receitas.loading_state"
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
            <div key={i} className="rounded-xl overflow-hidden">
              <Skeleton className="h-20 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && recipes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-ocid="receitas.recipe.empty_state"
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="font-display font-semibold text-foreground text-lg mb-2">
            Nenhuma receita encontrada
          </h3>
          <p className="text-muted-foreground text-sm">
            Tente outro termo ou categoria
          </p>
        </motion.div>
      )}

      {!isLoading && recipes.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {recipes.map((recipe, i) => (
            <RecipeCard
              key={recipe.name}
              recipe={recipe}
              index={i}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      )}

      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}
