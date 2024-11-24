"use client";

import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { urlEndPoint } from "../providers";

export function MemeList({ files }: { files: FileObject[] }) {
  console.log(files)
  return (
    <div>
      {files.map((file) => {
        return (
          <IKImage
            key={file.fileId}
            path={file.filePath}
            alt={file.name || "meme"}
            urlEndpoint={urlEndPoint}
            loading="lazy"
            width={300}
            height={500}
          />
        );
      })}
    </div>
  );
}
