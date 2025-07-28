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

export default function EventPage({ evt }) {
  const router = useRouter();

  // const deleteEvent = async (e) => {
  //   if (confirm("Are you sure?")) {
  //     // console.log(evt.id);
  //     const res = await fetch(`${API_URL}/events/${evt.id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       toast.error(data.message);
  //     } else {
  //       // router.reload()
  //       router.push("/events");
  //     }
  //   }
  // };

  return (
    <Layout>
      <div className={styles.event}>
        <span>{new Date(evt.projectDate).toLocaleDateString("en-US")}</span>
        <h1>{evt.projectName}</h1>
        <h4>
          Lead by {evt.projectLeader} solved using {evt.methode} motodology
          {/* {evt.status} */}
        </h4>
        <p></p>
        <ToastContainer />

        {evt.actionPhoto ? (
          <div className={styles.image}>
            <Image
              src={evt.actionPhoto.formats.small.url}
              width={960}
              height={600}
            />
          </div>
        ) : (
          <div className={styles.image}>
            <Image src="/images/event-default.jpg" width={960} height={600} />
          </div>
        )}

        <h3>{evt.Name}</h3>
        <p></p>
        <h3>Description:</h3>
        <p>{evt.problemDescription}</p>
        <h3>Target: </h3>
        <p>{evt.target}</p>

        <h3>Organization Structure: </h3>

        {evt.orgStructure ? (
          <div className={styles.image}>
            <Image
              src={evt.orgStructure.formats.small.url}
              width={960}
              height={600}
            />
          </div>
        ) : (
          <div className={styles.image}>
            <Image src="/images/event-default.jpg" width={960} height={600} />
          </div>
        )}

        <h3>Photo Before: </h3>

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

        <h3>Root Causes description:</h3>
        <p>{evt.rootCause}</p>
        <h3>Root Causes: </h3>
        {evt.rootCausePhoto ? (
          <div className={styles.image}>
            <Image
              src={evt.rootCausePhoto.formats.small.url}
              width={960}
              height={600}
            />
          </div>
        ) : (
          <div className={styles.image}>
            <Image src="/images/event-default.jpg" width={960} height={600} />
          </div>
        )}

        <h3>Action:</h3>
        <p>{evt.action}</p>
        <h3>Action photo: </h3>

        {evt.actionPhoto ? (
          <div className={styles.image}>
            <Image
              src={evt.actionPhoto.formats.small.url}
              width={960}
              height={600}
            />
          </div>
        ) : (
          <div className={styles.image}>
            <Image src="/images/event-default.jpg" width={960} height={600} />
          </div>
        )}

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
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
  };
}
