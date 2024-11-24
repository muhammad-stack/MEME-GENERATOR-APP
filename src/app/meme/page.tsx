import ImageKit from "imagekit";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { unstable_noStore } from "next/cache";

var imagekit: ImageKit = new ImageKit({
  publicKey: `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
  privateKey: `${process.env.PRIVATE_KEY}`,
  urlEndpoint: `${process.env.NEXT_PUBLIC_URL_ENDPOINT}`,
});

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  unstable_noStore();
  try {
    // Sanitize the search input
    const sanitizedQuery: string = encodeURIComponent(searchParams.q);

    const files = await imagekit.listFiles({
      searchQuery: `name:${sanitizedQuery}`,
    });

    console.log("Files Returned", files);
    if (!files || files.length === 0) {
      console.log("No file found");
    }

    return (
      <div>
        {files.map((file: FileObject) => {
          // {
          //   console.log(file);
          // }
          return <div key={file.fileId}>{file.name}</div>;
        })}
      </div>
    );
  } catch (error) {
    console.error("Error fetching files:", error);
    return <div>Error loading files</div>;
  }
};

export default SearchPage;
