import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
// import EventMap from "@/components/EventMap";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";

export default function EventPage({ evt }) {
  const router = useRouter();

  return (
    <Layout>
      <div className={styles.event}>
        <span>{new Date(evt.dateOfAudit).toLocaleDateString("en-US")}</span>
        <h1>{evt.name}</h1>
        <h4>Finding by {evt.auditor}</h4>
        <p></p>
        <ToastContainer />
        {evt.photoBefore ? (
          <div className={styles.image}>
            <Image
              src={evt.photoBefore.formats.small.url}
              width={960}
              height={600}
            />
          </div>
        ) : (
          <div className={styles.image}>
            <Image src="/images/event-default.jpg" width={960} height={600} />
          </div>
        )}
        {/* <h4>Category:</h4> */}
        Category <b>{evt.safetyCategory} </b> Behaviour
        <b> {evt.behaviourCategory}</b> {/* <h4>Behaviour:</h4> */}
        <p></p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Corrective Action:</h3>
        <p>{evt.correctiveAction}</p>
        <h3>Preventive Action:</h3>
        <p>{evt.preventiveAction}</p>
        <h3>Photo After: </h3>
        {evt.photoAfter ? (
          <div className={styles.image}>
            <Image
              src={evt.photoAfter.formats.small.url}
              width={960}
              height={600}
            />
          </div>
        ) : (
          <div className={styles.image}>
            <Image src="/images/event-default.jpg" width={960} height={600} />
          </div>
        )}
        {/* <EventMap evt={evt} /> */}
        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`)
//   const events = await res.json()

//   const paths = events.map((evt) => ({
//     params: { slug: evt.slug },
//   }))

//   return {
//     paths,
//     fallback: true,
//   }
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`)
//   const events = await res.json()

//   return {
//     props: {
//       evt: events[0],
//     },
//     revalidate: 1,
//   }
// }

export async function getServerSideProps({ query: { slug } }) {
  // const res = await fetch(
  //   `${API_URL}/api/projects?filters[slug]=${slug}&populate=*`
  // );
  const res = await fetch(`${API_URL}/audit-behaviours?slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
  };
}
