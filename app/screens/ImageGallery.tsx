import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useImages } from "../services/fetchImages";
import {
  ErrorComponent,
  FooterComponent,
  LoadingComponent,
  ImageThumb,
  ImageWall,
} from "../components";


export function ImageGallery() {
  const [page, setPage] = React.useState(1);
  const [imageResults, setImageResults] = React.useState([]);
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useImages(page);
  const { hasMore = false } = data ?? {};

  const keyExtractor = React.useCallback(
    (item, index) => `${item.id} - ${index}`,
    []
  );
  const renderItem = React.useCallback(
    ({ item }) => <ImageThumb item={item} />,
    []
  );
  const getItemLayout = React.useCallback(
    (_, index) => ({ length: 100, offset: 100 * index, index }),
    []
  );
  const onLoadMore = React.useCallback(
    () => {
      if (isFetching) return;
      if (!isPlaceholderData && data?.hasMore) {
        console.log("Loading more content..");
        setPage((previousPage) => previousPage + 1);
      }
    }, 
    [isFetching, isPlaceholderData, data?.hasMore]
  );
  const makeFooter = React.useCallback(
    () => FooterComponent({ isFetching, hasMore }),
    [isFetching, hasMore]
  );

  React.useEffect(() => {
    setImageResults((x) => [...x, ...(data?.results ?? [])]);
  }, [data]);

  return (
    <View style={styles.container}>
      {isPending ? (
        <LoadingComponent />
      ) : isError ? (
        <ErrorComponent {...{ error }} />
      ) : (
        <ImageWall
          {...{
            imageResults,
            makeFooter,
            onLoadMore,
            keyExtractor,
            renderItem,
            getItemLayout,
          }}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
