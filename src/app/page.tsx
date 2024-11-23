"use client";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import {
  IKUploadResponse,
  UploadError,
} from "imagekitio-next/dist/types/components/IKUpload/props";

import { useState } from "react";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

// Authenticator function to get the authentication parameters
const authenticator = async () => {
  try {
    // Fetching the authentication parameters from the server
    const response = await fetch("http://localhost:3000/api/auth");

    // Handling the error if the response is not ok
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    // Parsing the response to get the data
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

// Main component
export default function Home() {
  // State to store the file path
  const [filePath, setFilePath] = useState<string>("");

  // On error function to handle the error
  const onError = async (err: UploadError) => {
    console.log("Error", err);
  };

  // On Sucssess function to handle the success
  const onSuccess = (res: IKUploadResponse) => {
    console.log("Success", res);
    setFilePath(res.filePath);
  };

  // Hardcoded path for the image
  const paths: string = `${filePath}`;
  // HTML for displaying the UI
  return (
    <div className="flex items-center justify-center gap-4">
      {/* ImageKitProvider is basically a wrapper as like context api  */}
      <ImageKitProvider
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        {/* Images Display Section on Conditional Basis if the state 
        has some value only then it is displayed otherwise not */}

        {filePath && (
          <IKImage
            path={paths}
            width={500}
            height={500}
            transformation={[
              {
                raw: "l-text,i-Hello World,fs-25,l-end",
              },
            ]}
            alt="Meme Loading.."
          />
        )}

        {/* Images Upload Section */}
        <div>
          <h2>File Upload</h2>
          <IKUpload
            fileName="test-upload.png"
            onError={onError}
            onSuccess={onSuccess}
          />
        </div>
      </ImageKitProvider>
    </div>
  );
}
