"use client";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import {
  IKUploadResponse,
  UploadError,
} from "imagekitio-next/dist/types/components/IKUpload/props";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

// Authenticator function to get the authentication parameters
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const onSuccess = (res: IKUploadResponse) => {
  console.log("Success", res);
};

const onError = (err: UploadError) => {
  console.log("Error", err);
};

// Main component
export default function Home() {
  const paths: string = "meme_1.jpeg";
  return (
    <div className="flex items-center justify-center">
      <ImageKitProvider
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        <IKImage
          path={paths}
          width={300}
          height={500}
          transformation={[
            {
              raw: "l-text,i-Hello World,fs-25,l-end",
            },
          ]}
          alt="Meme Loading.."
        />
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
        />
      </ImageKitProvider>
    </div>
  );
}
