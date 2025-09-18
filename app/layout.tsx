import { QueryClient } from "@tanstack/react-query";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { getConfig } from "./config";
import { Providers } from "./providers";

const queryClient = new QueryClient();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get("cookie")
  );

  return (
    <html lang="zh-CN">
      <body>
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
