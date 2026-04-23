import Footer from "@/components/Footer";
import { getItem } from "@/utils/Storage";
import { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"

export default function Monitoria() {
  const [loading, setLoading] = useState(true);
  const [labs, setLabs] = useState<Array<Lab>>([]);
  const [monitorName, setMonitorName] = useState("");
  const router = useRouter();

  type LabStatus = "Disponível agora" | "Indisponível" | "Em aula";
  interface Lab {
    name: string;
    status: LabStatus;
    responsible?: string;
  }

  useEffect(() => {
    const checkUser = async () => {
      const user = await getItem("user");
      if (!user) {
        router.push("/login");
      } else {
        if (typeof user === "string") {
          setMonitorName(user);
        } else if (typeof user === "object") {
          setMonitorName(user?.name || user?.nome || "");
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  useEffect(() => {
    const loadLabs = async () => {
      let labs: Lab[] = await getItem("labs");
      if (!labs) {
        labs = [
          {
            name: "Lab 1",
            status: "Disponível agora",
            responsible: "Rafael",
          },
          { name: "Lab 2", status: "Indisponível" },
          { name: "Lab 3", status: "Em aula", responsible: "Iury Silva" },
          { name: "Lab 4", status: "Disponível agora", responsible: "Fillipe" },
          { name: "Lab 5", status: "Indisponível" },
          {
            name: "Pranchetário 1",
            status: "Disponível agora",
            responsible: "Everton",
          },
          { name: "Pranchetário 2", status: "Em aula", responsible: "Sônia" },
        ];
      }
      setLabs(labs);
    };

    loadLabs();
  }, []);

  const updateLabStatus = (labName: string, status: LabStatus) => {
    const responsible = monitorName.trim() || "Monitor";
    setLabs((prevLabs) =>
      prevLabs.map((lab) =>
        lab.name === labName
          ? {
              ...lab,
              status,
              responsible: status === "Indisponível" ? undefined : responsible,
            }
          : lab
      )
    );
  };

  const isCurrentMonitorResponsible = (lab: Lab) => {
    // por enquanto comparando apenas o nome do usuário
    //futuramente: implementar comparação por ID ou email para evitar conflitos de nomes iguais
    return (
      !!monitorName.trim() &&
      (lab.responsible || "").trim().toLowerCase() ===
        monitorName.trim().toLowerCase()
    );
  };

  return (
    <View className="flex-1 bg-[#0b0b0d]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 160, paddingTop: 130 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 rounded-2xl border border-[#2a2a32] bg-[#15151a] p-5">
          <Text className="text-white text-3xl font-extrabold tracking-tight">
            Monitoria de Labs
          </Text>
          <Text className="text-[#9f9fab] mt-1 text-sm">
            {monitorName.trim()
              ? `Olá, ${monitorName.split(" ")[0]} 👋`
              : "Gerencie a disponibilidade dos laboratórios"}
          </Text>
        </View>

        {loading ? (
          <View className="rounded-2xl border border-[#2a2a32] bg-[#15151a] p-5">
            <Text className="text-[#d0d0d0] text-base">Carregando...</Text>
          </View>
        ) : (
          labs.map((lab) => (
            <View
              key={lab.name}
              className="bg-[#15151a] rounded-2xl p-4 mb-3 border border-[#2a2a32]"
            >
              <View className="flex-row justify-between items-start mb-3">
                <Text className="text-white text-lg font-bold pr-2 flex-1">{lab.name}</Text>
                <Text
                  className={`text-xs px-3 py-1 rounded-full border ${
                    lab.status === "Disponível agora"
                      ? "bg-green-600/20 border-green-500 text-green-300"
                      : lab.status === "Em aula"
                      ? "bg-yellow-500/20 border-yellow-500 text-yellow-300"
                      : "bg-red-600/20 border-red-500 text-red-300"
                  }`}
                >
                  {lab.status}
                </Text>
              </View>

              <View className="mb-3 rounded-lg bg-[#101014] px-3 py-2 border border-[#23232b]">
                <Text className="text-[#bcbcbc] text-sm">
                  <Text className="text-[#8b8b97]">Responsável: </Text>
                  {lab.responsible || "-"}
                </Text>
              </View>

              {lab.status === "Indisponível" && (
                <View className="flex-row gap-1.5">
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => updateLabStatus(lab.name, "Disponível agora")}
                    className="flex-1 bg-emerald-700 rounded-lg py-1.5 px-2.5"
                  >
                    <Text className="text-white text-center text-xs font-medium">Disponível</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => updateLabStatus(lab.name, "Em aula")}
                    className="flex-1 bg-amber-400 rounded-lg py-1.5 px-2.5"
                  >
                    <Text className="text-[#1a1a1a] text-center text-xs font-medium">Em aula</Text>
                  </TouchableOpacity>
                </View>
              )}

              {lab.status !== "Indisponível" && isCurrentMonitorResponsible(lab) && (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => updateLabStatus(lab.name, "Indisponível")}
                  className="bg-rose-700 rounded-lg py-1.5 px-2.5"
                >
                  <Text className="text-white text-center text-xs font-medium">Fora de uso</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>
      <Footer />
    </View>
  );
}
