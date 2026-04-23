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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faEnvelope,
  faKey,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

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
        <View className="relative mb-4">
          <FontAwesomeIcon
            icon={faUser}
            size={16}
            color="#64748b"
            style={{ position: "absolute", left: 12, top: 13, zIndex: 1 }}
          />
          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Seu nome"
            placeholderTextColor="#64748b"
            className="bg-[#0f121a] border border-gray-700 text-white p-3 rounded-xl pl-10"
          />
        </View>

        {/* Email */}
        <Text className="text-white mb-1">Email</Text>
        <View className="relative mb-4">
          <FontAwesomeIcon
            icon={faEnvelope}
            size={16}
            color="#64748b"
            style={{ position: "absolute", left: 12, top: 13, zIndex: 1 }}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="seuemail@email.com"
            placeholderTextColor="#64748b"
            className="bg-[#0f121a] border border-gray-700 text-white p-3 rounded-xl pl-10"
          />
        </View>

        {/* Uma chave unica, que é gerada semanalmente e apenas divulgada para os prefessores e monitores */}
        {tipo === "professor" && (
          <>
            <Text className="text-white mb-1">Código de acesso</Text>
            <View className="relative mb-4">
              <FontAwesomeIcon
                icon={faKey}
                size={16}
                color="#64748b"
                style={{ position: "absolute", left: 12, top: 13, zIndex: 1 }}
              />
              <TextInput
                value={codigo}
                onChangeText={setCodigo}
                placeholder="Digite o código"
                placeholderTextColor="#64748b"
                className="bg-[#0f121a] border border-gray-700 text-white p-3 rounded-xl pl-10"
              />
            </View>
          </>
        )}

        {/* Senha */}
        <Text className="text-white mb-1">Senha</Text>
        <View className="relative mb-4">
          <FontAwesomeIcon
            icon={faLock}
            size={16}
            color="#64748b"
            style={{ position: "absolute", left: 12, top: 13, zIndex: 1 }}
          />
          <TextInput
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor="#64748b"
            className="bg-[#0f121a] border border-gray-700 text-white p-3 rounded-xl pl-10"
          />
        </View>

        {/* Confirmar senha */}
        <Text className="text-white mb-1">Confirmar Senha</Text>
        <View className="relative mb-6">
          <FontAwesomeIcon
            icon={faLock}
            size={16}
            color="#64748b"
            style={{ position: "absolute", left: 12, top: 13, zIndex: 1 }}
          />
          <TextInput
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor="#64748b"
            className="bg-[#0f121a] border border-gray-700 text-white p-3 rounded-xl pl-10"
          />
        </View>

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