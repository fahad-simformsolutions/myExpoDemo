import * as React from "react";
import { FlatList, StyleSheet } from "react-native";

export function ImageWall({ imageResults, makeFooter, onLoadMore, ...props }) {
  return (
    <>
      <FlatList
        style={styles.list}
        data={imageResults}
        renderItem={props.renderItem}
        {...props}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={makeFooter}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.15}
        removeClippedSubviews={true}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, marginVertical: 64 },
});
