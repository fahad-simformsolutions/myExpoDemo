import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useImages } from "./services/fetchImages";
import FastImage from "react-native-fast-image";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/queryClient";

const ImageThumb = React.memo(
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

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ImageWall />
    </QueryClientProvider>
  );
}

function FooterComponent({ isFetching, hasMore }) {
  if (!hasMore) return <></>;
  if (isFetching) return <ActivityIndicator size="small" />;

  return <></>;
}

function ImageWall() {
  const [page, setPage] = React.useState(1);
  const [imageResults, setImageResults] = React.useState([]);
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useImages(page);
  const keyExtractor = React.useCallback(
    (item, index) => `${item.id} - ${index}`,
    []
  );
  const renderItem = React.useCallback(
    ({ item }) => <ImageThumb item={item} />,
    []
  );
  const getItemLayout = React.useCallback(
  (_, index) => (
    {length: 100, offset: 100 * index, index}
  ), []);

  const onLoadMore = React.useCallback(() => {
    if (isFetching) return;
    if (!isPlaceholderData && data?.hasMore) {
      console.log('Loading more content..')
      setPage((previousPage) => previousPage + 1);
    }
  }, [isFetching, isPlaceholderData, data?.hasMore]);

  React.useEffect(() => {
    setImageResults((x) => [...x, ...(data?.results ?? [])]);
  }, [data]);

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else if (isError) {
    return (
      <View style={styles.container}>
        <Text>Error fetching images!</Text>
        <Text>{JSON.stringify(error)}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    const { total, total_pages, results, hasMore } = data;

    return (
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1, marginVertical: 64 }}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          data={imageResults}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => FooterComponent({ isFetching, hasMore })}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.15}
          removeClippedSubviews={true}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 328,
    height: 100,
    backgroundColor: "#cfcfcf",
    borderRadius: 10,
    margin: 5,
  },
  button: {
    width: "90%",
    height: 30,
    backgroundColor: "powderblue",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
  },
});
