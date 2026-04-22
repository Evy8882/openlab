import { Stack } from "expo-router";
// @ts-ignore - CSS side-effect import is resolved by Expo bundler at runtime
import "../global.css";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
