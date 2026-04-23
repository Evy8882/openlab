import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Footer from "../components/Footer";
import { getItem, removeItem, saveItem } from "@/utils/Storage";
import { useRouter } from "expo-router";

export default function Perfil() {
  const [foto, setFoto] = useState<string | null>(null);
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    tipo: "aluno", // Ou Monitor/Professor
  });

  const escolherFoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permissão necessária", "Precisamos acessar sua galeria");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const salvarEdicao = () => {
    setEditando(false);
    saveItem("user", usuario);
  };

  useEffect(() => {
    const checkUser = async () => {
      const user = await getItem("user");
      if (!user) {
        router.push("/login");
      }
      setUsuario(user);
    };
    checkUser();
    setLoading(false);
  }, []);

  function logOut() {
    removeItem("user");
    router.push("/login");
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#0e0e0e]">
        <Text className="text-white text-lg">Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
    <ScrollView className="flex-1 bg-[#0e0e0e]" contentContainerStyle={{ padding: 40 }}>
      {/* FOTO */}
      <TouchableOpacity onPress={escolherFoto}>
        <Image
          source={
            foto ? { uri: foto } : require("../assets/images/openlab-logo.png")
          }
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 3,
            borderColor: "#22d3ee",
            marginHorizontal: "auto"
          }}
        />
      </TouchableOpacity>

      <Text className="text-gray-400 mt-2 mb-4 mx-auto">Toque para alterar foto</Text>

      {/* NOME */}
      {editando ? (
        <TextInput
          value={usuario.nome}
          onChangeText={(text) => setUsuario({ ...usuario, nome: text })}
          className="text-white mx-auto text-2xl font-bold border-b border-cyan-400 mb-2 text-center"
        />
      ) : (
        <Text className="text-white mx-auto text-2xl font-bold">{usuario.nome}</Text>
      )}

      {/* TIPO */}
      <View className="mt-2 mb-6 mx-auto px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-400">
        <Text className="text-cyan-400 text-sm mx-auto">
          {usuario.tipo === "professor" ? "Professor / Monitor" : "Aluno"}
        </Text>
      </View>

      {/* CARD */}
      <View className="w-full max-w-md border-[#1F2937] bg-[#111827] p-6 rounded-2xl border">
        <Text className="text-gray-400 mb-1">Email</Text>

        {editando ? (
          <TextInput
            value={usuario.email}
            onChangeText={(text) => setUsuario({ ...usuario, email: text })}
            className="text-white text-lg mb-6 border-b border-cyan-400"
          />
        ) : (
          <Text className="text-white text-lg mb-6">{usuario.email}</Text>
        )}

        {/* BOTÃO EDITAR / SALVAR */}
        <TouchableOpacity
          onPress={editando ? salvarEdicao : () => setEditando(true)}
          className="bg-cyan-500 p-3 rounded-lg mb-3"
        >
          <Text className="text-center text-black font-semibold">
            {editando ? "Salvar" : "Editar Perfil"}
          </Text>
        </TouchableOpacity>

        {/* BOTÃO SAIR */}
        <TouchableOpacity className="bg-red-500 p-3 rounded-lg" onPress={logOut}>
          <Text className="text-center text-white font-semibold">Sair</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
