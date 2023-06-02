import { UnsplashUser } from "@/models/unsplash-user";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Alert } from "@/components/bootstrap";

interface PageProps {
  params: { username: string };
}

async function getUser(username: string): Promise<UnsplashUser> {
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=` +
      process.env.UNSPLASH_ACCESS_KEY
  );
  if (response.status === 404 || response.status === 403) notFound();

  return response.json();
}
// Use cache if you're not using native fetch
// ex) using axios is not deduplicate fetch
// const getUserCached = cache(getUser)

export async function generateMetadata({ params: { username } }: PageProps) {
  const user = await getUser(username);
  return {
    title:
      [user.first_name, user.last_name].filter(Boolean).join(" ") ||
      user.username,
  };
}

export default async function Page({ params: { username } }: PageProps) {
  const user = await getUser(username);

  return (
    <div>
      <Alert>
        This profile uses <strong>generateMetadata</strong> to set the page
        title dynamically from the API response
      </Alert>
      <h1>{user.username}</h1>
      <p>first name: {user.first_name}</p>
      <p>Last name: {user.last_name}</p>
      <a href={"https://unsplash.com/" + user.username}>Unsplash Profile</a>
    </div>
  );
}
