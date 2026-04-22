import { Text, View } from "react-native";

interface LabCardProps {
  name: string;
  status: "Disponível agora" | "Indisponível" | "Em aula";
}

export default function LabCard({ name, status }: LabCardProps) {
  function getStatusColor(status: LabCardProps["status"]) {
    switch (status) {
      case "Disponível agora":
        return "#22D3EE"; // Cyan
      case "Indisponível":
        return "#94A3B8"; // Gray
      case "Em aula":
        return "#F87171"; // Red
      default:
        return "#94A3B8"; // Default (gray)
    }
  }

  const statusColor = getStatusColor(status);

  return (
    <View className="gap-4 mb-4">
      <View className="flex-row overflow-hidden rounded-xl border border-[#1F2937] bg-[#111827]">
        <View className="w-3" style={{ backgroundColor: statusColor }} />
        <View className="flex-1 px-4 py-3">
          <Text className="text-2xl font-semibold color-[#F8FAFC]">{name}</Text>
          <Text className="mt-1 text-sm font-medium" style={{ color: statusColor }}>
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
}
