import * as React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/services/queryClient";
import { ImageGallery } from "./app/screens/ImageGallery";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ImageGallery />
    </QueryClientProvider>
  );
}

