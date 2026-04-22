import { useState } from "react";
import { Image, Text, ScrollView, View, Pressable } from "react-native";
import LabCard from "../components/LabCard";
import Footer from "@/components/Footer";
const image = require("../assets/images/openlab-logo.png");

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<
    "Todos" | "Laboratórios" | "Pranchetários"
  >("Todos");

  const categories: Array<"Todos" | "Laboratórios" | "Pranchetários"> = [
    "Todos",
    "Laboratórios",
    "Pranchetários",
  ];

  type LabStatus = "Disponível agora" | "Indisponível" | "Em aula";
  interface Lab {
    name: string;
    status: LabStatus;
  }

  const labs: Lab[] = [
    { name: "Lab 1", status: "Disponível agora" },
    { name: "Lab 2", status: "Indisponível" },
    { name: "Lab 3", status: "Em aula" },
    { name: "Lab 4", status: "Disponível agora" },
    { name: "Lab 5", status: "Indisponível" },
    { name: "Pranchetário 1", status: "Disponível agora" },
    { name: "Pranchetário 2", status: "Em aula" },
  ]

  return (
    <View className="flex-1">
    <ScrollView className="flex-1 bg-[#0e0e0e]" contentContainerStyle={{ paddingBottom: 40 }}>

      {/* homepage header */}
      <View className="items-center justify-center px-5 pb-6 pt-6">
        <View className="rounded-2xl px-4 py-3">
          <Image source={image} resizeMode="contain" style={{ width: 200, height: 100 }} />
        </View>
      </View>

      {/* menu de categorias */}
      <View className="mb-5 flex-row items-center justify-center gap-3 px-5">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`rounded-xl border transition px-5 py-3 ${
                isSelected
                  ? "border-[#22D3EE] bg-[#0F172A]"
                  : "border-[#334155] bg-[#111827]"
              }`}
            >
              <Text
                className={`font-semibold ${
                  isSelected ? "color-[#22D3EE]" : "color-[#94A3B8]"
                }`}
              >
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Lista de ambientes */}
      <View className="px-5">
        <Text className="mb-5 text-2xl font-bold color-[#F8FAFC]">Ambientes disponíveis</Text>

        {labs.map((lab) => (
          <LabCard key={lab.name} name={lab.name} status={lab.status} />
        ))}
      </View>
    </ScrollView>
      <Footer></Footer>
    </View>
  );
}
