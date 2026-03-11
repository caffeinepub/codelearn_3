import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ChefHat, Clock, Plus, Search, TriangleAlert, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { RecipeMatch } from "../backend.d";
import { Difficulty } from "../backend.d";
import { useGetSuggestionsByIngredients } from "../hooks/useQueries";

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
};

const CATEGORY_EMOJIS: Record<string, string> = {
  breakfast: "☕",
  lunch: "🍽️",
  dinner: "🌙",
  snack: "🥪",
  dessert: "🍰",
};

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3"];

const sampleMatches: RecipeMatch[] = [
  {
    matchPercentage: 100n,
    recipe: {
      name: "Omelete Simples",
      category: "breakfast" as any,
      cookingTime: 10n,
      difficulty: Difficulty.easy,
      ingredients: ["ovos", "sal", "manteiga"],
      steps: ["Bata os ovos", "Frite na manteiga"],
    },
  },
  {
    matchPercentage: 75n,
    recipe: {
      name: "Arroz com Ovo",
      category: "lunch" as any,
      cookingTime: 20n,
      difficulty: Difficulty.easy,
      ingredients: ["arroz", "ovos", "alho", "sal"],
      steps: ["Cozinhe o arroz", "Frite o ovo", "Misture com alho"],
    },
  },
];

function MatchCard({ match, index }: { match: RecipeMatch; index: number }) {
  const pct = Number(match.matchPercentage);
  const color =
    pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-amber-500" : "bg-red-400";

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      data-ocid={`ingredientes.results.item.${index + 1}`}
      className="bg-card rounded-xl border border-border shadow-card p-4"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">
              {CATEGORY_EMOJIS[match.recipe.category] || "🍴"}
            </span>
            <h3 className="font-display font-semibold text-foreground text-base leading-tight">
              {match.recipe.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{Number(match.recipe.cookingTime)} min</span>
            <ChefHat className="w-3.5 h-3.5 ml-1" />
            <span>
              {DIFFICULTY_LABELS[match.recipe.difficulty] ||
                match.recipe.difficulty}
            </span>
          </div>
        </div>
        <span
          className={`text-lg font-display font-bold px-2.5 py-1 rounded-lg ${
            pct >= 80
              ? "bg-green-100 text-green-800"
              : pct >= 50
                ? "bg-amber-100 text-amber-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {pct}%
        </span>
      </div>
      <div className="mb-2">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Correspondência de ingredientes</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{
              delay: index * 0.08 + 0.3,
              duration: 0.6,
              ease: "easeOut",
            }}
            className={`h-full rounded-full ${color}`}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {match.recipe.ingredients.slice(0, 4).map((ing) => (
          <Badge
            key={ing}
            variant="outline"
            className="text-xs border-border text-muted-foreground"
          >
            {ing}
          </Badge>
        ))}
        {match.recipe.ingredients.length > 4 && (
          <Badge
            variant="outline"
            className="text-xs border-border text-muted-foreground"
          >
            +{match.recipe.ingredients.length - 4}
          </Badge>
        )}
      </div>
    </motion.div>
  );
}

export default function IngredientesTab() {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchTags, setSearchTags] = useState<string[]>([]);

  const {
    data: backendResults,
    isLoading,
    isError,
  } = useGetSuggestionsByIngredients(searchTags, searchEnabled);

  const results =
    backendResults && backendResults.length > 0 && searchEnabled
      ? [...backendResults].sort(
          (a, b) => Number(b.matchPercentage) - Number(a.matchPercentage),
        )
      : searchEnabled && searchTags.length > 0
        ? [...sampleMatches].sort(
            (a, b) => Number(b.matchPercentage) - Number(a.matchPercentage),
          )
        : [];

  const addTag = () => {
    const val = inputValue.trim().toLowerCase();
    if (val && !tags.includes(val)) {
      setTags((prev) => [...prev, val]);
      setSearchEnabled(false);
    }
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
    setSearchEnabled(false);
  };

  const handleSearch = () => {
    if (tags.length === 0) return;
    setSearchTags([...tags]);
    setSearchEnabled(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") addTag();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display font-bold text-foreground text-xl mb-1">
          O que tenho em casa?
        </h2>
        <p className="text-muted-foreground text-sm">
          Digite os ingredientes que você tem disponíveis
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Ex: ovos, farinha, manteiga..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-card border-border focus-visible:ring-primary/30"
          data-ocid="ingredientes.input"
        />
        <Button
          onClick={addTag}
          disabled={!inputValue.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4"
          data-ocid="ingredientes.add_button"
        >
          <Plus className="w-4 h-4 mr-1" />
          Adicionar
        </Button>
      </div>

      <AnimatePresence>
        {tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2"
          >
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                data-ocid={`ingredientes.tag.item.${i + 1}`}
                className="ingredient-tag flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={handleSearch}
        disabled={tags.length === 0 || isLoading}
        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
        data-ocid="ingredientes.search_button"
      >
        {isLoading ? (
          <>
            <Search className="w-4 h-4 mr-2 animate-pulse" />
            Buscando...
          </>
        ) : (
          <>
            <Search className="w-4 h-4 mr-2" />
            Buscar Receitas
          </>
        )}
      </Button>

      {isLoading && (
        <div className="space-y-3">
          {SKELETON_KEYS.map((k) => (
            <div
              key={k}
              className="rounded-xl border border-border p-4 space-y-3"
            >
              <div className="flex justify-between">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-8 w-16 rounded-lg" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div
          data-ocid="ingredientes.error_state"
          className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20"
        >
          <TriangleAlert className="w-5 h-5 text-destructive" />
          <p className="text-sm text-destructive">
            Erro ao buscar receitas. Tente novamente.
          </p>
        </div>
      )}

      {!isLoading && !isError && searchEnabled && results.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-ocid="ingredientes.results.empty_state"
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <span className="text-5xl mb-4">🥺</span>
          <h3 className="font-display font-semibold text-foreground text-lg mb-2">
            Nenhuma receita encontrada
          </h3>
          <p className="text-muted-foreground text-sm">
            Tente adicionar mais ingredientes ou outros itens
          </p>
        </motion.div>
      )}

      {!searchEnabled && tags.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-ocid="ingredientes.results.empty_state"
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <span className="text-5xl mb-4">🛒</span>
          <h3 className="font-display font-semibold text-foreground text-lg mb-2">
            Adicione seus ingredientes
          </h3>
          <p className="text-muted-foreground text-sm">
            Vamos descobrir o que você pode cozinhar!
          </p>
        </motion.div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-medium">
            {results.length} receita{results.length !== 1 ? "s" : ""} encontrada
            {results.length !== 1 ? "s" : ""}
          </p>
          {results.map((match, i) => (
            <MatchCard key={match.recipe.name} match={match} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
