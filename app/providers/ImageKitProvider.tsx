"use client";

import { IKContext } from "imagekitio-react";

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

export default function ImageKitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      transformationPosition="path" // or "query"
    >
      {children}
    </IKContext>
  );
}
