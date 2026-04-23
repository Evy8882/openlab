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

export default function Login() {
  const [tipo, setTipo] = useState<"aluno" | "professor">("aluno");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [codigo, setCodigo] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    console.log({
      email,
      senha,
      tipo,
      codigo: tipo === "professor" ? codigo : null,
    });

    Alert.alert("Sucesso", "Login realizado!");
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

        {/* Tipo */}
        <View className="flex-row mb-6 bg-black rounded-xl p-1">
          <TouchableOpacity
            onPress={() => setTipo("aluno")}
            className={`flex-1 p-2 rounded-lg ${
              tipo === "aluno" ? "bg-cyan-500" : ""
            }`}
          >
            <Text className="text-center text-white">Aluno</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTipo("professor")}
            className={`flex-1 p-2 rounded-lg ${
              tipo === "professor" ? "bg-cyan-500" : ""
            }`}
          >
            <Text className="text-center text-white">
              Professor/Monitor
            </Text>
          </TouchableOpacity>
        </View>

        {/* Email */}
        <Text className="text-white mb-1">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="seuemail@email.com"
          placeholderTextColor="#64748b"
          className="bg-black border border-gray-700 text-white p-3 rounded-lg mb-4"
        />

        {/* Senha */}
        <Text className="text-white mb-1">Senha</Text>
        <TextInput
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholder="********"
          placeholderTextColor="#64748b"
          className="bg-black border border-gray-700 text-white p-3 rounded-lg mb-6"
        />

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