import Link from "next/link";
import Layout from "@/components/LayoutHomePage";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import Image from "next/image";
import MooNewsList from "@/components/MooNewsList";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Moo News</h1>
      <MooNewsList />


      {/* {events.length === 0 && <h3>No projects to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Projects</a>
        </Link>
      )} */}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=projectDate:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
