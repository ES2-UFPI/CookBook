import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeadersDefaults } from "axios";

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const login = async (email: string, password: string) => {
  const { data } = await api.post("/login", {
    email,
    password,
  });

  AsyncStorage.setItem("@cookbook:token", data.token);
  api.defaults.headers = {
    Authorization: `Bearer ${data.token}`,
  } as CommonHeaderProperties;

  return data;
};

export const logOff = async () => {
  AsyncStorage.removeItem("@cookbook:token");
  api.defaults.headers = {
    Authorization: "",
  } as CommonHeaderProperties;
}

export const signUp = async (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
) => {
  const { data } = await api.post("/user", {
    name,
    email,
    password,
    passwordConfirm,
  });

  AsyncStorage.setItem("token", data.token);
  api.defaults.headers = {
    Authorization: `Bearer ${data.token}`,
  } as CommonHeaderProperties;

  return data;
}