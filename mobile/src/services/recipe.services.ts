import api from "./api";

export const getRecipe = async (id: string) => {
  const response = await api.get(`/recipe/${id}`);
  return response;
}

export const getTopRecipes = async (page: number, limit: number = 10) => {
  const response = await api.get(`/getTopRecipes?page=${page}&limit=${limit}`);
  return response;
}

export const getMyRecipes = async (page: number, limit: number = 100) => {
  const response = await api.get(`/recipeByUser?page=${page}&limit=${limit}`);
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

export const createRecipe = async (recipe: any) => {
  const response = await api.post('/recipe', recipe);
  return response;
}

export const addRecipeComment = async (id: string, message: string) => {
  const response = await api.post(`/addRecipeComment/${id}`, {message});
  return response;
}