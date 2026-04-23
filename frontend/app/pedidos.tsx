import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { getItem } from "@/utils/Storage";

export default function Pedidos() {
  const [necessidade, setNecessidade] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSubmit = () => {
    if (!necessidade || !data || !hora) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    console.log({ necessidade, data, hora });

    Alert.alert(
      "Pedido enviado",
      "Entraremos em contato para verificar a disponibilidade.",
    );

    setNecessidade("");
    setData("");
    setHora("");
  };

  useEffect(() => {
    const checkUser = async () => {
      const user = await getItem("user");
      if (!user) {
        router.push("/login");
      }
    };
    checkUser();
    setLoading(false);
  }, []);

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
      <Image
        source={require("../assets/images/openlab-logo.png")}
        style={{ width: 220, height: 80 }}
        resizeMode="contain"
        className="mx-auto"
      />

      {/* Card */}
      <View className="w-full border-[#1F2937] bg-[#111827] p-6 rounded-2xl border">
        <Text className="text-white text-xl font-semibold mb-6">
          Solicitar um Pedido
        </Text>

        {/* Necessidade */}
        <Text className="text-white mb-1">Descreva sua necessidade</Text>
        <TextInput
          value={necessidade}
          onChangeText={setNecessidade}
          placeholder="Ex: Necessito de algum software instalado para realização de minhas atividades..."
          placeholderTextColor="#64748b"
          multiline
          numberOfLines={5}
          className="bg-black border border-gray-700 text-white p-3 rounded-lg mb-4"
          style={{ textAlignVertical: "top" }}
        />

        {/* Data */}
        <Text className="text-white mb-1">Data</Text>
        <TextInput
          value={data}
          onChangeText={setData}
          placeholder="Ex: 25/04/2026"
          placeholderTextColor="#64748b"
          className="bg-black border border-gray-700 text-white p-3 rounded-lg mb-4"
        />

        {/* Hora */}
        <Text className="text-white mb-1">Horário</Text>
        <TextInput
          value={hora}
          onChangeText={setHora}
          placeholder="Ex: 16:10"
          placeholderTextColor="#64748b"
          className="bg-black border border-gray-700 text-white p-3 rounded-lg mb-6"
        />

        {/* Botão */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-cyan-500 p-3 rounded-lg"
        >
          <Text className="text-center text-black font-semibold">
            Enviar Pedido
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
      <Footer />
      </View>
  );
}
