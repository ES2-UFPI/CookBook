import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { RootStackParamList } from "../../routes/StackNavigator";
import { getRecipe } from "../../services/recipe.services";
import {
  Container,
  ContentWrapper,
  Image,
  InfoContainer,
  InfoText,
  InfoTextMinor,
  Ingredient,
  IngredientStrong,
  Subtitle,
  Text,
  Title,
} from "./styles";

type ScreenProp = StackNavigationProp<RootStackParamList, "Recipe">;
type screenRouteProp = RouteProp<RootStackParamList, "Recipe">;

export default function Recipe() {
  const [recipe, setRecipe] = useState<any>();
  const { navigate, goBack } = useNavigation<ScreenProp>();
  const { id } = useRoute<screenRouteProp>().params;

  const fetchRecipe = async () => {
    try {
      const { data } = await getRecipe(id);
      setRecipe(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <Container>
      <ContentWrapper>
        <Header goBack onPressLeft={() => goBack()} />

        {recipe && (
          <>
            <Title>{recipe.name}</Title>

            <Image source={{ uri: recipe.imgURL }} />

            <InfoContainer>
              <MaterialIcons name="timer" size={20} color={"#5636D3"} />
              <InfoText>{recipe.cookTime} min</InfoText>
              <FontAwesome
                name="star"
                size={20}
                color="#ffb703"
                style={{ marginLeft: 14 }}
              />
              <InfoText>
                {recipe.averageRating == "NaN" ? 0 : recipe.averageRating}{" "}
              </InfoText>
              <InfoTextMinor>({recipe.ratings.length})</InfoTextMinor>
            </InfoContainer>

            <Subtitle>Ingredientes</Subtitle>

            {recipe.ingredients.map((ingredient: any) => (
              <Ingredient>
                <IngredientStrong>- {ingredient.name}, </IngredientStrong>
                {ingredient.amount}
              </Ingredient>
            ))}

            <Subtitle>Modo de preparo</Subtitle>

            <Text>{recipe.prepMethod.replace(/\n/g, "\n\n")}</Text>
          </>
        )}
      </ContentWrapper>
    </Container>
  );
}
