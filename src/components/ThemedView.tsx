import { useColorScheme, View, ViewProps } from "react-native";
import { Colors } from "../constants/theme";

export interface ThemedViewProps extends ViewProps {
  lightColor?: string;
  darkColor?: string;
}

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const theme = useColorScheme() ?? "light";
  const backgroundColor =
    theme === "light"
      ? (lightColor ?? Colors.light.background)
      : (darkColor ?? Colors.dark.background);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
