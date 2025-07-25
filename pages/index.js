import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>PSG PROJECTS</h1>
      {events.length === 0 && <h3>No projects to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Projects</a>
        </Link>
      )} 
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=projectDate:ASC&_limit=3`);
  const text = await res.text();
  let events = [];
  try {
    events = JSON.parse(text);
  } catch (e) {
    console.error("Invalid JSON from API:", text);
    events = [];
  }

  return {
    props: { events },
    revalidate: 1,
  };
}