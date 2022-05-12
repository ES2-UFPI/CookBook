import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import CardVertical from "../../components/CardVertical";
import Header from "../../components/Header";
import MainCard from "../../components/MainCard";
import { RootStackParamList } from "../../routes/StackNavigator";
import { getRecipes, getTopRecipes } from "../../services/recipe.services";
import { Carousel, CarouselTitle, Container, ContentWrapper } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { navigate } = useNavigation<ScreenProp>();
  const [recipes1, setRecipes1] = useState<RecipeProps[]>([]);
  const [recipes2, setRecipes2] = useState<RecipeProps[]>([]);
  const [recipes3, setRecipes3] = useState<RecipeProps[]>([]);
  const [recipes4, setRecipes4] = useState<RecipeProps[]>([]);

  useFocusEffect(() => {
    setIsAuthenticated(false)
    const getToken = async () => {
      return await AsyncStorage.getItem("@cookbook:token") || null;
    }
    getToken().then(token => {
      if (token) {
        setIsAuthenticated(true);
      }
    })
  });

  const fetchRecipes = async () => {
    try {
      const { data } = await getTopRecipes(1);
      setRecipes1(data.data);
    } catch (e) {
      console.log(e);
    }
    try {
      const { data } = await getRecipes(2, 10);
      setRecipes2(data.data);
    } catch (e) {
      console.log(e);
    }
    try {
      const { data } = await getRecipes(3, 10);
      setRecipes3(data.data);
    } catch (e) {
      console.log(e);
    }
    try {
      const { data } = await getRecipes(4, 10);
      setRecipes4(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Container>
      <ContentWrapper>
        <Header
          onPressLeft={() => isAuthenticated ? navigate("Menu") : navigate("Login")}
          onPressRight={() => navigate("Search")}
        />

        {recipes4.length > 0 && (
          <MainCard
            image_url={recipes4[recipes4.length - 1].imgURL}
            name={recipes4[recipes4.length - 1].name}
            onPress={() =>
              navigate("Recipe", { id: recipes4[recipes4.length - 1]._id })
            }
          />
        )}

        {recipes1.length > 0 && (
          <>
            <CarouselTitle>Receitas relevantes</CarouselTitle>

            <Carousel>
              {recipes1.map((recipe) => (
                <CardVertical
                  key={recipe._id}
                  image_url={recipe.imgURL}
                  name={recipe.name}
                  onPress={() => navigate("Recipe", { id: recipe._id })}
                />
              ))}
            </Carousel>
          </>
        )}

        {recipes2.length > 0 && (
          <>
            <CarouselTitle>Saindo do forno</CarouselTitle>

            <Carousel>
              {recipes2.map((recipe) => (
                <CardVertical
                  key={recipe._id}
                  image_url={recipe.imgURL}
                  name={recipe.name}
                  onPress={() => navigate("Recipe", { id: recipe._id })}
                />
              ))}
            </Carousel>
          </>
        )}

        {recipes3.length > 0 && (
          <>
            <CarouselTitle>Recém cadastradas</CarouselTitle>

            <Carousel>
              {recipes3.map((recipe) => (
                <CardVertical
                  image_url={recipe.imgURL}
                  key={recipe._id}
                  name={recipe.name}
                  onPress={() => navigate("Recipe", { id: recipe._id })}
                />
              ))}
            </Carousel>
          </>
        )}

        {recipes4.length > 0 && (
          <>
            <CarouselTitle>Top Receitas</CarouselTitle>

            <Carousel>
              {recipes4.map((recipe) => (
                <CardVertical
                  image_url={recipe.imgURL}
                  key={recipe._id}
                  name={recipe.name}
                  onPress={() => navigate("Recipe", { id: recipe._id })}
                />
              ))}
            </Carousel>
          </>
        )}
      </ContentWrapper>
    </Container>
  );
}
