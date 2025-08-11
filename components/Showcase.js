import styles from "@/styles/Showcase.module.css";
import Typed from "react-typed";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function Showcase() {
  return (
    <div className={styles.showcase}>
      <Image src="/images/header_bg.png" width={500} height={50} />

      <h1>Welcome To G.R.E.A.T</h1>
      <h2>Greenfields Reporting and Analysis Tool</h2>
      {/* <Typography color={"secondary"} component={"span"} variant={"inherit"}> */}
      <Typography
        variant="h4"
        color="green"
        gutterBottom
        sx={{
          fontWeight: 700,
        }}
      >
        <Typed
          strings={[
            "#BeraniExtra",
            "#ExtraFresh",
            "#ExtraTasty",
            "#ExtraGlam",
            "#ExtraGo",
            "#ExtraActive",
          ]}
          typeSpeed={80}
          loop={true}
        />
      </Typography>
    </div>
  );
}
