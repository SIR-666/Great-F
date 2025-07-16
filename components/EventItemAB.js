import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.photoBefore
              ? evt.photoBefore.formats.thumbnail.url
              : "/images/event-default.jpg"
          }
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>{new Date(evt.dateOfAudit).toLocaleDateString("en-US")}</span>
        <h3>{evt.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/auditBehaviours/${evt.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
