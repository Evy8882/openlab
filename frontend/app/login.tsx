import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { saveItem } from "@/utils/Storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    // Simulação de login:
    // Ainda deve ser implementado com o backend
    const userData = {
      nome: email.split("@")[0],
      email,
      tipo: "aluno",
    };
    
    console.log("Usuário logado:", userData);

    await saveItem("user", userData);
    router.push("/");
  };

  return (
    <View className="flex-1 bg-[#0e0e0e] items-center justify-center px-4">

      {/* Logo */}
      <Image
        source={require("../assets/images/openlab-logo.png")}
        style={{ width: 220, height: 80 }}
        resizeMode="contain"
      />

      {/* Card */}
      <View className="w-full max-w-md border-[#1F2937] bg-[#111827] mt-10 p-6 rounded-2xl border">

        <Text className="text-white text-xl font-semibold mb-6">
          Entrar
        </Text>

        {/* Email */}
        <Text className="text-gray-200 mb-1">Email</Text>
        <View className="relative mb-4">
          <View className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            <FontAwesomeIcon icon={faEnvelope} size={16} color="#38bdf8" />
          </View>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="seuemail@email.com"
            placeholderTextColor="#64748b"
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-[#0f121a] border border-gray-700/80 text-white p-3 pl-10 rounded-xl"
          />
        </View>

        {/* Senha */}
        <Text className="text-gray-200 mb-1">Senha</Text>
        <View className="relative mb-6">
          <View className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            <FontAwesomeIcon icon={faLock} size={16} color="#38bdf8" />
          </View>
          <TextInput
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor="#64748b"
            className="bg-[#0f121a] border border-gray-700/80 text-white p-3 pl-10 rounded-xl"
          />
        </View>

        {/* Botão */}
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-cyan-500 p-3 rounded-lg"
        >
          <Text className="text-center text-black font-semibold">
            Entrar
          </Text>
        </TouchableOpacity>

        {/* Redirecionamento para cadastro */}
        <TouchableOpacity className="mt-4" onPress={()=>{
          router.push("/cadastro");
        }}>
          <Text className="text-cyan-400 text-center">
            Não tem uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}