import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function SearchPage({ events }) {
  const router = useRouter();

  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No projects found</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { projectName_contains: term },
        { projectLeader_contains: term },
        { problemDescription_contains: term },
        { target_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}
