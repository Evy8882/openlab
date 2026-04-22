import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface LabMenuProps {
    opened: boolean;
    labName: string;
    labStatus: "Disponível agora" | "Indisponível" | "Em aula";
    labResponsible?: string;
    onClose: () => void;
}

export default function LabMenu({opened, labName, labStatus, labResponsible, onClose}: LabMenuProps) {

    function getStatusColor(status: LabMenuProps["labStatus"]) {
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

    return (
      <View className={`absolute transition bottom-6 left-0 right-0 z-50 mx-auto w-[92%] rounded-3xl border border-[#1F2937] bg-[#0F172A] p-6 shadow-2xl ${opened ? 'opacity-100' : 'opacity-0 hidden'}`}>
        <View className="mb-2 items-center">
          <View className="h-1.5 w-14 rounded-full bg-[#334155]" />
        </View>

        <TouchableOpacity className="absolute top-4 right-4 rounded-full p-2" onPress={onClose}>
          <FontAwesomeIcon icon={faClose} color="#94A3B8" size={20} />
        </TouchableOpacity>

        <View className="mb-4 gap-3">
          <Text className="text-center text-2xl font-semibold text-white">{labName}</Text>

          <View className="self-center rounded-full border border-[#1F2937] bg-[#111827] px-4 py-1.5">
            <Text className="text-sm font-medium" style={{ color: getStatusColor(labStatus) }}>
              {labStatus}
            </Text>
          </View>
        </View>

            {labResponsible && (
          <Text className="mb-4 text-center text-base text-[#CBD5E1]">Responsável: <Text className="font-semibold text-white">{labResponsible}</Text></Text>
            )}
            {labStatus !== "Indisponível" && (
        <View>
            <TextInput
          className="mb-4 w-full rounded-xl border border-[#334155] bg-white/5 px-4 py-3 text-white"
                placeholder="Escreva o que pretende fazer no ambiente..."
                placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
            />

        <TouchableOpacity className="w-full items-center rounded-xl bg-[#22D3EE] py-3.5">
          <Text className="text-base font-semibold text-[#0F172A]">Pedir para usar</Text>
            </TouchableOpacity>
        </View>
        )
        }
        </View>
    );
}