"use client";

import { ImageKitProvider } from "imagekitio-next";
import { authenticator } from "./page";


export const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ImageKitProvider
      urlEndpoint={urlEndPoint}
      publicKey={process.env.NEXT_PUBLIC_PUBLIC_KEY}
      authenticator={authenticator}
    >
      {children}
    </ImageKitProvider>
  );
}
