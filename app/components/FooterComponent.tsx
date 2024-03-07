import * as React from "react";
import { ActivityIndicator } from "react-native";

type FooterComponentParams = {
    isFetching: boolean,
    hasMore: boolean
}

export function FooterComponent({ isFetching, hasMore }: FooterComponentParams) {
  if (!hasMore) return <></>;
  if (isFetching) return <ActivityIndicator size="small" />;

  return <></>;
}
