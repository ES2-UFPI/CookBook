import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ToastAndroid,
  View,
} from "react-native";
import Header from "../../components/Header";
import Input from "../../components/Input";
import InputArea from "../../components/InputArea";
import { RootStackParamList } from "../../routes/StackNavigator";
import { addRecipeComment, changeFeedback, getRecipe } from "../../services/recipe.services";
import {
  SearchButton,
  SearchButtonText,
  SearchContainer,
} from "../Search/styles";
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
  StarsContainer,
  CommentContainer,
  CommentText,
  CommentTime,
} from "./styles";

type ScreenProp = StackNavigationProp<RootStackParamList, "Recipe">;
type screenRouteProp = RouteProp<RootStackParamList, "Recipe">;

export default function Recipe() {
  const [recipe, setRecipe] = useState<any>();
  const { navigate, goBack } = useNavigation<ScreenProp>();
  const [loading, setLoading] = useState(true);
  const [loadingComment, setLoadingComment] = useState(false);
  const [comment, setComment] = useState("");
  const { id } = useRoute<screenRouteProp>().params;
  const [stars, setStars] = useState(5);

  const fetchRecipe = async () => {
    try {
      const { data } = await getRecipe(id);
      console.log(data);
      setRecipe(data.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleChangeStars = async (stars: number) => {
    setStars(stars);
    try {
      const { data } = await changeFeedback(id, stars);
      Platform.OS == "android"
        ? ToastAndroid.show(`Sua avaliação foi enviada com sucesso!`, 5)
        : Alert.alert(`Sua avaliação foi enviada com sucesso!`);

      console.log(data);
    } catch (e: any) {
      if (e.response.status == 401) {
        return Platform.OS == "android"
          ? ToastAndroid.show(`Faça o seu login para enviar avaliações 😢`, 5)
          : Alert.alert(`Faça o seu login para enviar avaliações 😢`);
      }

      Platform.OS == "android"
        ? ToastAndroid.show(`Houve um erro ao enviar sua avaliação 😢`, 5)
        : Alert.alert(`Houve um erro ao enviar sua avaliação 😢`);
    }
  };

  const handleSendComment = async () => {
    setLoadingComment(true);
    try {
      const { data } = await addRecipeComment(id, comment);
      Platform.OS == "android"
        ? ToastAndroid.show(`Seu comentário foi enviado com sucesso!`, 5)
        : Alert.alert(`Seu comentário foi enviado com sucesso!`);
      console.log(data);
    } catch (e: any) {
      if (e.response.status == 401) {
        return Platform.OS == "android"
          ? ToastAndroid.show(`Faça o seu login para enviar comentários 😢`, 5)
          : Alert.alert(`Faça o seu login para enviar comentários 😢`);
      }
    }
    setLoadingComment(false); 
    setComment("");
    fetchRecipe();
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <Container>
      <ContentWrapper>
        <Header goBack onPressLeft={() => goBack()} />

        {loading && <ActivityIndicator size="large" color="#5636D3" />}

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

            <Subtitle>Avaliações</Subtitle>

            <StarsContainer>
              {Array(5)
                .fill(0)
                .map((_, idx) => {
                  return idx < stars ? (
                    <FontAwesome
                      name="star"
                      size={45}
                      color="#ffb703"
                      onPress={() => handleChangeStars(idx + 1)}
                    />
                  ) : (
                    <FontAwesome
                      name="star-o"
                      size={45}
                      color="#ffb703"
                      onPress={() => handleChangeStars(idx + 1)}
                    />
                  );
                })}
            </StarsContainer>

            <Subtitle>Comentários</Subtitle>

            <SearchContainer style={{ paddingLeft: 0, paddingRight: 0 }}>
              <InputArea
                placeholder="Deixe um comentário"
                value={comment}
                setValue={setComment}
              />
            </SearchContainer>
            <SearchButton onPress={handleSendComment} style={{marginLeft: 0, marginBottom: 24}}>
              {loadingComment ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <SearchButtonText>Enviar</SearchButtonText>
              )}
            </SearchButton>

            {recipe.comments.map((comments: any) => (
              <CommentContainer key={comments._id}>
                <InfoText>
                  {comments.author} <CommentTime>{}</CommentTime>
                </InfoText>
                <CommentText>{comments.message}</CommentText>
              </CommentContainer>
            ))}
          </>
        )}
      </ContentWrapper>
    </Container>
  );
}
