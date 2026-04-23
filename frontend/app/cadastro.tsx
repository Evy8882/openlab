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

export default function Cadastro() {
  const [tipo, setTipo] = useState<"aluno" | "professor">("aluno");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [codigo, setCodigo] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    console.log({
      nome,
      email,
      senha,
      tipo,
      codigo: tipo === "professor" ? codigo : null,
    });

    Alert.alert("Sucesso", "Cadastro realizado!");
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
          Criar Conta
        </Text>

        {/* Seleção de tipo */}
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
            <Text className="text-center text-white">Professor/Monitor</Text>
          </TouchableOpacity>
        </View>

        {/* Nome */}
        <Text className="text-white mb-1">Nome</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome"
          placeholderTextColor="#64748b"
          className="bg-black border border-gray-700 text-white p-3 rounded-lg mb-4"
        />

        {/* Email */}
        <Text className="text-white mb-1">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="seuemail@email.com"
          placeholderTextColor="#64748b"
          className="bg-black border border-gray-700 text-white p-3 rounded-lg mb-4"
        />

        {/* Uma chave unica, que é gerada semanalmente e apenas divulgada para os prefessores e monitores */}
        {tipo === "professor" && (
          <>
            <Text className="text-white mb-1">Código de acesso</Text>
            <TextInput
              value={codigo}
              onChangeText={setCodigo}
              placeholder="Digite o código"
              placeholderTextColor="#64748b"
              className="bg-black border border-gray-700 text-white p-3 rounded-lg mb-4"
            />
          </>
        )}

        {/* Senha */}
        <Text className="text-white mb-1">Senha</Text>
        <TextInput
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholder="********"
          placeholderTextColor="#64748b"
          className="bg-black border border-gray-700 text-white p-3 rounded-lg mb-4"
        />

        {/* Confirmar senha */}
        <Text className="text-white mb-1">Confirmar Senha</Text>
        <TextInput
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
          placeholder="********"
          placeholderTextColor="#64748b"
          className="bg-black border border-gray-700 text-white p-3 rounded-lg mb-6"
        />

        {/* Botão */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-cyan-500 p-3 rounded-lg"
        >
          <Text className="text-center text-black font-semibold">
            Cadastrar
          </Text>
        </TouchableOpacity>

        {/* Redirecionamento para login */}
        <TouchableOpacity className="mt-4" onPress={() => {
          router.push("/login");
        }}>
          <Text className="text-cyan-400 text-center">
            Já tem uma conta? Faça login
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}