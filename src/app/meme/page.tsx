
import ImageKit from "imagekit";
import { IKImage } from "imagekitio-next";
import { unstable_noStore } from "next/cache";
import { MemeList } from "./MemeList";
import { urlEndPoint } from "../providers";

var imagekit: ImageKit = new ImageKit({
  publicKey: `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
  privateKey: `${process.env.PRIVATE_KEY}`,
  urlEndpoint: `${urlEndPoint}`,
});

// Type definition for the search params
type SearchParams = { q: string };

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  unstable_noStore();
  const files = await imagekit.listFiles({
    searchQuery: `name:${searchParams.q}`,
  });
  return (
    <div>
      <MemeList files={files} />
    </div>
  );
};

export default SearchPage;
