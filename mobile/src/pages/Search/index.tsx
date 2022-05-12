import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  ToastAndroid,
} from "react-native";
import Button from "../../components/Button";
import CardHorizontal from "../../components/CardHorizontal";
import HeaderPreLogin from "../../components/HeaderPreLogin";
import Input from "../../components/Input";
import { RootStackParamList } from "../../routes/StackNavigator";
import { getRecipes, getRecipesByName } from "../../services/recipe.services";
import {
  Container,
  ContentWrapper,
  SearchContainer,
  SearchButton,
  SearchButtonText,
  Title,
  ViewOutlay,
  ModalContainer,
  Outlay,
  TagContainer,
  TagText,
  TagsContainer,
} from "./styles";

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
  match?: string;
};

export default function Search() {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation<ScreenProp>();
  const [recipeName, setRecipeName] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<String[]>([]);
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { data } = await getRecipesByName(1, 15, recipeName);
      setRecipes(data.data);
    } catch (e) {
      Platform.OS == "android"
        ? ToastAndroid.show("Erro ao buscar receitas!", 5)
        : Alert.alert("Erro ao buscar receitas!");
    }
    setLoading(false);
  };

  const handleSearchByIngredients = async () => {
    setLoading(true);
    setModalVisible(false);
    const ingredientsString = ingredients.map((it) => it.trim()).join(",");
    try {
      const { data } = await getRecipes(1, 15, ingredientsString, "");
      setRecipes(data.data);
    } catch (e) {
      Platform.OS == "android"
        ? ToastAndroid.show("Erro ao buscar receitas!", 5)
        : Alert.alert("Erro ao buscar receitas!");
    }
    setLoading(false);
  };

  const toggleVisible = () => setModalVisible(!modalVisible);

  return (
    <Container>
      <Modal visible={modalVisible} transparent onRequestClose={toggleVisible}>
        <ViewOutlay>
          <Outlay activeOpacity={1}>
            <ModalContainer>
              <Ionicons
                name="close"
                size={24}
                color="black"
                onPress={toggleVisible}
                style={{ marginLeft: "auto" }}
              />
              <Title>Ingredientes</Title>
              <SearchContainer style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Input
                  placeholder="Ingrediente"
                  value={ingredient}
                  setValue={setIngredient}
                  style={{ flex: 3 }}
                />
                <SearchButton
                  onPress={() => {
                    if (ingredients.includes(ingredient)) {
                      Platform.OS == "android"
                        ? ToastAndroid.show("Ingrediente já adicionado!", 5)
                        : Alert.alert("Ingrediente já adicionado!");
                      return;
                    }
                    setIngredients((old) => [...old, ingredient]);
                    setIngredient("");
                  }}
                >
                  <SearchButtonText>Adicionar</SearchButtonText>
                </SearchButton>
              </SearchContainer>

              <TagsContainer>
                {ingredients.map((ingredient, index) => (
                  <TagContainer key={index}>
                    <Ionicons
                      name="close"
                      size={20}
                      color="white"
                      onPress={() =>
                        setIngredients((old) =>
                          old.filter((i) => i !== ingredient)
                        )
                      }
                      style={{ marginLeft: "auto" }}
                    />
                    <TagText>{ingredient}</TagText>
                  </TagContainer>
                ))}
              </TagsContainer>

              <Button
                title="Pesquisar"
                onPress={handleSearchByIngredients}
                style={{ marginTop: "auto" }}
              />
            </ModalContainer>
          </Outlay>
        </ViewOutlay>
      </Modal>

      <HeaderPreLogin rightOnPress={() => setModalVisible(!modalVisible)} />

      <SearchContainer>
        <Input
          placeholder="Buscar receita"
          value={recipeName}
          setValue={setRecipeName}
          style={{ flex: 5 }}
        />
        <SearchButton onPress={handleSearch}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <SearchButtonText>Buscar</SearchButtonText>
          )}
        </SearchButton>
      </SearchContainer>

      <ContentWrapper>
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <CardHorizontal
              key={recipe._id}
              image_url={recipe.imgURL}
              name={recipe.name.length > 40 ? recipe.name.substring(0, 40) + "..." : recipe.name}
              style={{ marginBottom: 8 }}
              onPress={() => navigate("Recipe", { id: recipe._id })}
              match={recipe.match}
            />
          ))}
      </ContentWrapper>
    </Container>
  );
}
