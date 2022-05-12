import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Alert, Platform, ToastAndroid } from "react-native";
import Button from "../../components/Button";
import HeaderPreLogin from "../../components/HeaderPreLogin";
import Input from "../../components/Input";
import InputArea from "../../components/InputArea";
import { RootStackParamList } from "../../routes/StackNavigator";
import { signUp } from "../../services/auth.services";
import { createRecipe } from "../../services/recipe.services";
import {
  SearchButton,
  SearchButtonText,
  SearchContainer,
  TagContainer,
  TagsContainer,
  TagText,
} from "../Search/styles";
import {
  ButtonContainer,
  Container,
  InputContainer,
  Logo,
  NavigateToLoginText,
  Title,
} from "./styles";

type ScreenProp = StackNavigationProp<RootStackParamList, "Register">;

export default function RegisterRecipe() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState<String[]>([]);
  const [ingredient, setIngredient] = useState("");
  const [prepMethod, setPrepMethod] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation<ScreenProp>();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { data } = await createRecipe({ name, ingredients: ingredients.map((it) => ({
        name: it,
        amount: "1",
      })), prepMethod, cookTime, imgURL, tags: [] });
      console.log(data);
      
      Platform.OS === "android" ? ToastAndroid.show("Receita cadastrada com sucesso! 😁", ToastAndroid.SHORT) : Alert.alert("Receita cadastrada com sucesso! 😁");
      navigate("Home");
    } catch (e) {
      Platform.OS == "android"
        ? ToastAndroid.show(`Erro ao cadastrar receita!`, 5)
        : Alert.alert(`Erro ao cadastrar receita!`);
    }
    setLoading(false);
  };

  return (
    <Container>
      <HeaderPreLogin />
      <Title> Registro de receita </Title>
      <InputContainer>
        <Input style={{marginBottom: 12}} value={name} setValue={(e) => setName(e)} placeholder="Nome" />

        <InputArea
          value={prepMethod}
          setValue={(e) => setPrepMethod(e)}
          placeholder="Modo de preparo"
        />

        <Input
          value={cookTime}
          setValue={(e) => setCookTime(e)}
          placeholder="Tempo de preparo"
          style={{marginBottom: 12, marginTop: 12}} 
        />

        <Input
          value={imgURL}
          setValue={(e) => setImgURL(e)}
          placeholder="URL da imagem"
          style={{marginBottom: 12}} 
        />

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
                  setIngredients((old) => old.filter((i) => i !== ingredient))
                }
                style={{ marginLeft: "auto" }}
              />
              <TagText>{ingredient}</TagText>
            </TagContainer>
          ))}
        </TagsContainer>
      </InputContainer>

      <ButtonContainer>
        <Button
          onPress={handleRegister}
          title="Cadastrar"
          isLoading={loading}
        />
      </ButtonContainer>
    </Container>
  );
}
