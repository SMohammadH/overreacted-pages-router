import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import Link from "next/link";
import React from "react";
import { montserrat } from "../assets/fonts";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import ThemeToggle from "@/components/ThemeToggle";
import { PersistGate } from "redux-persist/integration/react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <nav>
          <Link href="/">
            <h1 className={montserrat.className}>overreacted</h1>
          </Link>
          <ThemeToggle />
        </nav>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
