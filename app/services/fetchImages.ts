import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchImages = async (page = 0) => {
  const query = `${
    process.env.EXPO_PUBLIC_UNSPLASH_API_URL
  }/search/photos?query=landscape&client_id=${
    process.env.EXPO_PUBLIC_UNSPLASH_API_KEY
  }&per_page=${30}&page=${page}`;

  try {
    const response = await fetch(query);
    const { total, total_pages, results } = await response.json();

    return {
      total,
      total_pages,
      results: results.map((imageItem: (typeof results)[0]) => ({
        id: imageItem.id,
        url: imageItem.urls.regular,
        width: imageItem.width,
        height: imageItem.height,
      })),
      hasMore: page < total_pages,
    };
  } catch (error) {
    console.error(error);
  }
};

export const useImages = (page: number) =>
  useQuery({
    queryKey: ["images", page],
    queryFn: () => fetchImages(page),
    placeholderData: keepPreviousData,
  });
