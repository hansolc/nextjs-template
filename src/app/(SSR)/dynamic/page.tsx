import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

// dynamic rendering

export const metadata = {
  title: "Dynamic Fetching - NextJS 13.4 Image Gallery",
};

// export const revalidate = 0;

export default async function Page() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY,
    {
      // revalidate = 0 과 같은 역할을 한다.
      //   cache: "no-cache",
      next: {
        revalidate: 0,
      },
    }
  );
  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;
  image.description ??= "no description";

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <strong>fetches data dynamically.</strong>
        Every time you refresh the page, you get a new image from the Unsplash
        API
      </Alert>
      <Image
        alt={image.description}
        // alt={image.description}
        src={image.urls.raw}
        width={width}
        height={height}
        className="rounded shadow mw-100 h-100"
      />
      by{" "}
      <Link href={`/users/${image.user.username}`}>{image.user.username}</Link>
    </div>
  );
}
