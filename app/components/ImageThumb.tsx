import * as React from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

export const ImageThumb = React.memo(
  ({ item }) => (
    <FastImage
      style={styles.image}
      source={{
        uri: item?.url,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  ),
  (prevProps, nextProps) => {
    return prevProps.item.id === nextProps.item.id;
  }
);

const styles = StyleSheet.create({
  image: {
    width: 328,
    height: 100,
    backgroundColor: "#cfcfcf",
    borderRadius: 10,
    margin: 5,
  },
});
