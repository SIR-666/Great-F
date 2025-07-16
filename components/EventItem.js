import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.actionPhoto
              ? evt.actionPhoto.formats.thumbnail.url
              : "/images/event-default.jpg"
          }
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>{new Date(evt.projectDate).toLocaleDateString("en-US")}</span>
        <h3>{evt.projectName}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
