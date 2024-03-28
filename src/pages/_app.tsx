import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FuelProvider } from "@fuels/react";
import { defaultConnectors } from '@fuels/connectors';

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <FuelProvider fuelConfig={{connectors: defaultConnectors({devMode: true})}}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FuelProvider>
    </QueryClientProvider>
  );
}
