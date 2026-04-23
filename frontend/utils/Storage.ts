import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isWeb = Platform.OS === "web";

// FUnções para armazenamento, que salvam tanto na web (localStorage) quanto no mobile (AsyncStorage)

export async function saveItem(key: string, value: object) {
  try {
    const data = JSON.stringify(value);

    if (isWeb) {
      localStorage.setItem(key, data);
    } else {
      await AsyncStorage.setItem(key, data);
    }
  } catch (error) {
    console.error("Erro ao salvar:", error);
  }
}


export async function getItem(key: string) {
  try {
    let data;

    if (isWeb) {
      data = localStorage.getItem(key);
    } else {
      data = await AsyncStorage.getItem(key);
    }

    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Erro ao buscar:", error);
    return null;
  }
}


export async function removeItem(key: string) {
  try {
    if (isWeb) {
      localStorage.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  } catch (error) {
    console.error("Erro ao remover:", error);
  }
}