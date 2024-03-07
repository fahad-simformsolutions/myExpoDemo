import * as React from "react";
import { ActivityIndicator, Text } from "react-native";

export function LoadingComponent() {
  return (
    <>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </>
  );
}
