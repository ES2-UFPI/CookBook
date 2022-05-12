import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import CardVertical from "../../components/CardVertical";
import Header from "../../components/Header";
import MainCard from "../../components/MainCard";
import { RootStackParamList } from "../../routes/StackNavigator";
import {
  getMyRecipes,
  getRecipes,
  getTopRecipes,
} from "../../services/recipe.services";
import { Carousel, CarouselTitle, Container, ContentWrapper } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderPreLogin from "../../components/HeaderPreLogin";

type ScreenProp = StackNavigationProp<RootStackParamList, "Home">;

type RecipeProps = {
  authorId: string;
  averageRating: number;
  comments: [];
  cookTime: number;
  _id: string;
  imgURL: string;
  name: string;
  ratings: [];
  tags: [];
};

export default function MyRecipes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { navigate } = useNavigation<ScreenProp>();
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);

  const fetchRecipes = async () => {
    try {
      const { data } = await getMyRecipes(1);
      setRecipes(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Container>
      <HeaderPreLogin />
      <ContentWrapper>
        <CarouselTitle>Minhas receitas</CarouselTitle>
        <Carousel>
          {recipes.map((recipe) => (
            <CardVertical
              key={recipe._id}
              image_url={recipe.imgURL}
              name={recipe.name}
              onPress={() => navigate("Recipe", { id: recipe._id })}
            />
          ))}
        </Carousel>
      </ContentWrapper>
    </Container>
  );
}
