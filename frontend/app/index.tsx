import { Image, Text, ScrollView, View } from "react-native";
const image = require("../assets/images/openlab-logo.png");

export default function Index() {
  return (
    <ScrollView className="flex-1 bg-[#0e0e0e]" contentContainerStyle={{ paddingBottom: 40 }}>

      {/* homepage header */}
      <View className="items-center justify-center px-5 pb-6 pt-6">
        <View className="rounded-2xl px-4 py-3">
          <Image source={image} resizeMode="contain" style={{ width: 200, height: 100 }} />
        </View>
      </View>

      {/* menu de categorias */}
      <View className="mb-5 flex-row items-center justify-center gap-3 px-5">
        <View className="rounded-xl border border-[#334155] bg-[#111827] px-5 py-3">
          <Text className="font-semibold color-[#94A3B8]">Todos</Text>
        </View>
        <View className="rounded-xl border border-[#334155] bg-[#111827] px-5 py-3">
          <Text className="font-semibold color-[#94A3B8]">Laboratórios</Text>
        </View>
        <View className="rounded-xl border border-[#334155] bg-[#111827] px-5 py-3">
          <Text className="font-semibold color-[#94A3B8]">Pranchetários</Text>
        </View>
      </View>

      {/* Lista de ambientes */}
      <View className="px-5">
        <Text className="mb-5 text-2xl font-bold color-[#F8FAFC]">Ambientes disponíveis</Text>

        <View className="gap-4">
          <View className="flex-row overflow-hidden rounded-xl border border-[#1F2937] bg-[#111827]">
            <View className="w-3 bg-[#0EA5C1]" />
            <View className="flex-1 px-4 py-3">
              <Text className="text-2xl font-semibold color-[#F8FAFC]">Lab 1</Text>
              <Text className="mt-1 text-sm font-medium color-[#22D3EE]">Disponível agora</Text>
            </View>
          </View>

          <View className="flex-row overflow-hidden rounded-xl border border-[#1F2937] bg-[#111827]">
            <View className="w-3 bg-[#475569]" />
            <View className="flex-1 px-4 py-3">
              <Text className="text-2xl font-semibold color-[#F8FAFC]">Lab 2</Text>
              <Text className="mt-1 text-sm font-medium color-[#94A3B8]">Indisponível</Text>
            </View>
          </View>

          <View className="flex-row overflow-hidden rounded-xl border border-[#1F2937] bg-[#111827]">
            <View className="w-3 bg-[#B91C1C]" />
            <View className="flex-1 px-4 py-3">
              <Text className="text-2xl font-semibold color-[#F8FAFC]">Lab 3</Text>
              <Text className="mt-1 text-sm font-medium color-[#F87171]">Em aula</Text>
            </View>
          </View>

          <View className="flex-row overflow-hidden rounded-xl border border-[#1F2937] bg-[#111827]">
            <View className="w-3 bg-[#0EA5C1]" />
            <View className="flex-1 px-4 py-3">
              <Text className="text-2xl font-semibold color-[#F8FAFC]">Pranchetário 1</Text>
              <Text className="mt-1 text-sm font-medium color-[#22D3EE]">Disponível agora</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
