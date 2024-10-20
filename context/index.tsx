'use client'

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {networks, projectId, wagmiAdapter} from "@/config";
import {createAppKit} from "@reown/appkit/react";
import {ReactNode} from "react";
import {type Config, cookieToInitialState, WagmiProvider} from 'wagmi';

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error('Project ID is not defined')
}

createAppKit({
  adapters:[wagmiAdapter],
  projectId,
  networks,
  metadata: {
    name: "My App",
    description: "My App Description",
    url: "http://localhost:3000",
    icons: ["http://localhost:3000/favicon.ico"],
  },
  enableEIP6963: true,
  enableCoinbase: false
})

function ContextProvider({ children, cookies }: {children: ReactNode, cookies: string | null}) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider