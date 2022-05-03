import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Alert, Platform, ToastAndroid } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "../../components/Button";
import HeaderPreLogin from "../../components/HeaderPreLogin";
import Input from "../../components/Input";
import { RootStackParamList } from "../../routes/StackNavigator";
import { login } from "../../services/auth.services";
import {
  ButtonContainer,
  Container,
  InputContainer,
  Logo,
  NavigateToRegisterText,
  Title,
} from "./styles";

type ScreenProp = StackNavigationProp<RootStackParamList, "Login">;

export default function Login() {
  const [loading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { navigate } = useNavigation<ScreenProp>();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const data = await login(email, password);

      Platform.OS == "android"
        ? ToastAndroid.show(`Bem vindo, ${data.name}!`, 5)
        : Alert.alert(`Bem vindo, ${data.name}!`);

      navigate("Home");
    } catch {
      Platform.OS == "android"
        ? ToastAndroid.show("Erro no login", 5)
        : Alert.alert("Erro no login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToRegister = () => {
    navigate("Register");
  };

  return (
    <Container>
      <HeaderPreLogin />
      <Logo> CookBook </Logo>

      <Title> Login </Title>
      <InputContainer>
        <Input
          value={email}
          setValue={(e) => setEmail(e)}
          placeholder="Email"
          keyboardType="email-address"
        />

        <Input
          value={password}
          setValue={(e) => setPassword(e)}
          placeholder="Senha"
          secureTextEntry
        />
      </InputContainer>

      <ButtonContainer>
        <Button onPress={handleLogin} isLoading={loading} title="Login" />

        <TouchableOpacity
          activeOpacity={0.7}
          style={{ marginTop: 10 }}
          onPress={handleNavigateToRegister}
        >
          <NavigateToRegisterText>
            Ainda não tem login? Crie uma conta.
          </NavigateToRegisterText>
        </TouchableOpacity>
      </ButtonContainer>
    </Container>
  );
}
