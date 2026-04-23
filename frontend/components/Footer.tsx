import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faHandPointUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'expo-router';

export default function Footer() {
    return (
        // navbar
        <View
            className="absolute bottom-16 w-[88%] self-center rounded-2xl border border-white/20 bg-black/80 px-5 py-4"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.25,
                shadowRadius: 16,
                elevation: 10,
            }}
        >
                
                <View className="flex-row items-center justify-around">

                     <Link href="/" asChild>
                <TouchableOpacity className="flex-col items-center">
                    <FontAwesomeIcon icon={faHome} size={20} color="#F8FAFC" />
                    <Text className="mt-1 text-[12px] text-slate-100">Home</Text>
                </TouchableOpacity>
                </Link>
                <Link href="/pedidos" asChild>
                <TouchableOpacity className="flex-col items-center">
                    <FontAwesomeIcon icon={faHandPointUp} size={20} color="#F8FAFC" />
                    <Text className="mt-1 text-[12px] text-slate-100">Pedidos</Text>
                </TouchableOpacity>
                 </Link>
                 <Link href="/perfil" asChild>
                <TouchableOpacity className="flex-col items-center">
                    <FontAwesomeIcon icon={faUser} size={20} color="#F8FAFC" />
                    <Text className="mt-1 text-[12px] text-slate-100">Perfil</Text>
                </TouchableOpacity>
            </Link>
            </View>
        </View>
    );
}