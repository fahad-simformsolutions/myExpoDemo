import * as React from "react";
import { Text } from "react-native";

type ErrorComponentParams = {
  error: any;
};

export function ErrorComponent({ error }: ErrorComponentParams) {
  return (
    <>
      <Text>Error fetching images!</Text>
      <Text>{JSON.stringify(error)}</Text>
    </>
  );
}
