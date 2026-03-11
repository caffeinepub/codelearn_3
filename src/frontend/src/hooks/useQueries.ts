import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Category, ChatMessage, Recipe, RecipeMatch } from "../backend.d";
import { useActor } from "./useActor";

export function useSearchRecipes(searchText: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Recipe[]>({
    queryKey: ["recipes", "search", searchText],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchRecipes(searchText);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRecipesByCategory(category: Category | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Recipe[]>({
    queryKey: ["recipes", "category", category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getRecipesByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useGetSuggestionsByIngredients(
  ingredients: string[],
  enabled: boolean,
) {
  const { actor, isFetching } = useActor();
  return useQuery<RecipeMatch[]>({
    queryKey: ["recipes", "suggestions", ingredients],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSuggestionsByIngredients(ingredients);
    },
    enabled: !!actor && !isFetching && enabled && ingredients.length > 0,
  });
}

export function useGetChatHistory(sessionId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<ChatMessage[]>({
    queryKey: ["chat", sessionId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getChatHistory(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
  });
}

export function useSendMessage(sessionId: string) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.sendMessage(sessionId, "user", message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", sessionId] });
    },
  });
}
