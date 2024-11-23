import ImageKit from "imagekit";
import { unstable_noStore } from "next/cache";

var imagekit: ImageKit = new ImageKit({
  publicKey: `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
  privateKey: `${process.env.PRIVATE_KEY}`,
  urlEndpoint: `${process.env.PRIVATE_KEY}`,
});

// Type definition for the search params
type SearchParams = { q: string };

const SearchPage = async (props: SearchParams) => {
  unstable_noStore();
  const files = await imagekit.listFiles({
    searchQuery: `name:${props.q}`,
  });
  return (
    <div>
      {files.map((file) => {
        {
          console.log(file);
        }
        return <div key={file.fileId}>{file.name}</div>;
      })}
    </div>
  );
};

export default SearchPage;
