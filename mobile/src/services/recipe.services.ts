import api from "./api";

export const getRecipe = async (id: string) => {
  const response = await api.get(`/recipe/${id}`);
  return response;
}

export const getRecipes = async (page: number, limit: number = 10, ingredients: string = '', tags: string = '') => {
  const response = await api.get(`/recipe?page=${page}&limit=${limit}&ingredients=${ingredients}&tags=${tags}`);
  return response;
}

export const getRecipesByName = async (page: number, limit: number = 10, name='') => {
  const response = await api.get(`/recipeByName/${name}?page=${page}&limit=${limit}`);
  return response;
}

export const changeFeedback = async (id: string, stars: number) => {
  const response = await api.patch(`/recipe/ratings/${id}`, { stars });
  return response;
}
