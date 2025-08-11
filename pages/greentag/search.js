import React, { useReducer, useState, useContext, useEffect } from "react";
import { parseCookies } from "@/helpers/index";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import ReactDOM from "react-dom";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import AuthContext from "@/context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import UploadModal from "@/components/ImageUploadNode";
import Modal from "@/components/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";
import Modalx from "@mui/material/Modal";

// Fungsi untuk menambahkan jumlah hari, mengecualikan hari Sabtu dan Minggu

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SearchPage({}) {
  const { user } = useContext(AuthContext);
  const [tagNo, setTagNo] = useState(""); // State untuk menyimpan nilai input

  const router = useRouter();

  const handleInputChange = (e) => {
    setTagNo(e.target.value); // Perbarui state berdasarkan input
  };

  const handleConfirmX = (e) => {
    e.preventDefault();
    if (tagNo) {
      console.log("tag no", tagNo);
      router.push(`edit/${tagNo}`);
    } else {
      alert("Please enter a Tag Number."); // Beri peringatan jika tidak ada nomor tag
    }
    setOpen(false); // Tutup modal setelah navigasi atau jika tidak ada tag number
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    if (!tagNo) {
      alert("Sila input tag number"); // Beri peringatan jika tidak ada nomor tag
      return;
    }

    const apiUrl = `http://10.24.7.70:8080/getgreenTAGno/${tagNo}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.length > 0) {
        console.log("Tag found:", data);
        // router.push(`edit/${tagNo}`);
        const ID = data[0].ID; // Mengambil ID dari respon
        router.push(`edit/${ID}`); // Navigasi ke halaman edit dengan ID
        setOpen(false); // Tutup modal setelah operasi
      } else {
        alert("Tag Number telah diclosed / tidak ditemukan"); // Peringatan jika tidak ada data
      }
    } catch (error) {
      console.error("Failed to fetch tag data:", error);
      alert("Periksa kembali koneksi anda."); // Peringatan jika terjadi error pada fetch
    }

    // setOpen(false); // Tutup modal setelah operasi
  };

  //buat modal
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Layout title="Search TAG">
      <Link href="/events">Go Back</Link>
      <h1>Search greenTAG</h1>
      <ToastContainer />
      <Modalx
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Search Tag Number
          </Typography>
          <Divider />
          <br />
          <Grid container direction="row" justifyContent="space-between">
            <form onSubmit={handleConfirm} className={styles.form2}>
              <div>
                <div>
                  <label htmlFor="TagNo">Input Tag No</label>
                  <input
                    type="number"
                    name="TagNo"
                    id="TagNo"
                    value={tagNo}
                    onChange={handleInputChange}
                    height="40px"
                    padding="5px"
                    size="small"
                  ></input>
                </div>
              </div>
              <Divider />
              <br />
              <input
                type="submit"
                value="Search"
                className="btn"
                variant="contained"
              />
            </form>
          </Grid>
        </Box>
      </Modalx>
    </Layout>
  );
}
