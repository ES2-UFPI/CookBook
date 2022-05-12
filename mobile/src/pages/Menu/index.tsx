import React, { useState } from "react";
import styled from "styled-components/native";

import { FontAwesome5 } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import Option from "./components/Option";
import { RootStackParamList } from "../../routes/StackNavigator";
import api from "../../services/api";
import { Alert, Platform, ToastAndroid } from "react-native";
import { logOff } from "../../services/auth.services";
import HeaderPreLogin from "../../components/HeaderPreLogin";

type screenProp = StackNavigationProp<RootStackParamList, "Menu">;

export default function Menu() {
  const { goBack, navigate } = useNavigation<screenProp>();

  const [userName, setUserName] = useState("");

  const getInfo = async () => {
    try {
      const { data } = await api.get("/user/me");
      setUserName(data.name);
    } catch (e) {
      Platform.OS == "android"
        ? ToastAndroid.show(`Erro ao buscar suas informações!`, 5)
        : Alert.alert(`Erro ao buscar suas informações!`);
    }
  };

  // useEffect(() => {
  //   getInfo();
  // }, []);

  return (
    <Container>
      <HeaderPreLogin/>

      <FontAwesome5
        name="user"
        size={36}
        style={{ marginBottom: 50 }}
        color="black"
      />

      <UserName>{userName}</UserName>

      <ScrollView style={{ width: "100%", marginTop: 40 }} contentContainerStyle={{paddingHorizontal: 20}}>
        <Option title="Cadastrar receitas" onPress={() => navigate("RegisterRecipe")} />
        <Option title="Sair" exit onPress={() => {
          logOff();
          goBack();
        }} />
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 20px 0;
  align-items: center;
  background: ${(props) => props.theme.colors.background};
  position: relative;
`;

const UserName = styled.Text`
  margin-top: 4px;
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 20px;
`;
