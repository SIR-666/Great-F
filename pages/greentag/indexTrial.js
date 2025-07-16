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
// import { addBusinessDays } from "moment-business-days";

// import dayjs from "dayjs";

// Fungsi untuk menambahkan jumlah hari, mengecualikan hari Sabtu dan Minggu
const addBusinessDays = (startDate, days) => {
  let resultDate = moment(startDate);
  let addedDays = 0;
  while (addedDays < days) {
    resultDate = resultDate.add(1, "days");
    if (resultDate.day() !== 0 && resultDate.day() !== 6) {
      // Hari bukan Sabtu (0) atau Minggu (6)
      addedDays++;
    }
  }
  return resultDate;
};

const optionsAbnormalityType = [
  { label: "Safety", value: "Safety" },
  { label: "Quality", value: "Quality" },
  { label: "5S", value: "5S" },
  { label: "Kerusakan Ringan", value: "Kerusakan Ringan" },
];

const optionsMaintenanceType = [
  // { label: "-", value: "-" },
  { label: "Autonomous Maintenance", value: "Autonomous Maintenance" },
  { label: "Planned Maintenance", value: "Planned Maintenance" },
];

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

export default function AddEventPage({}) {
  const { user } = useContext(AuthContext);
  const [options, setOptions] = useState([]);
  const [optionsDept, setOptionsDept] = useState([]);
  const [loading, setLoading] = useState(false);
  let today = moment().format("YYYY-MM-DD");

  // var hariIni = new Date().toISOString().split("T")[0];
  const date = new Date();
  const tanggal1 = new Date(date.getFullYear(), date.getMonth());
  let tanggalSiji = moment(tanggal1).format("YYYY-MM-DD");
  const [values, setValues] = useState({
    TagNo: "",
    IssuedDate: moment().format("YYYY-MM-DD"), // Tanggal hari ini
    ExpectedDate: moment().format("YYYY-MM-DD"), // Tanggal hari ini
    AbnormalityType: "",
    ObservedArea: "",
    Line: "",
    Machine: "",
    TaggerName: "",
    MaintenanceType: "",
    Picture: "", //auto by login
    AbnormalityDescription: "",
    ProposedSolution: "",
    info1: "Open",
    datesystem: today,
    footprint: user ? user.email : null, // auto by login
    // footprint: "marjhy@gmail.com",
  });
  const router = useRouter();

  const [areas, setAreas] = useState([]);
  const [lines, setLines] = useState([]);
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://10.24.7.70:8080/getgreenTAGarea");
      const data = await response.json();

      const areasData = [...new Set(data.map((item) => item.observedArea))].map(
        (area) => ({ value: area, label: area })
      );
      setAreas(areasData);
      console.log("areasData ", areasData);

      const linesData = data.reduce((acc, item) => {
        const { observedArea, line } = item;
        if (!acc[observedArea]) {
          acc[observedArea] = [];
        }
        if (!acc[observedArea].find((l) => l.value === line)) {
          acc[observedArea].push({ label: line, value: line });
        }
        return acc;
      }, {});
      setLines(linesData);

      const machinesData = data.reduce((acc, item) => {
        const { line, subGroup } = item;
        if (!acc[line]) {
          acc[line] = [];
        }
        if (!acc[line].find((m) => m.value === subGroup)) {
          acc[line].push({ label: subGroup, value: subGroup });
        }
        return acc;
      }, {});
      setMachines(machinesData);
    }

    fetchData();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [uploadedImagePath, setUploadedImagePath] = useState(null);
  const handleModalClose = (path) => {
    // path.preventDefault();
    setShowModal(false);
    // setShowModal(path);
    // console.log("path handleModalClose ", path);
  };
  const handleUploadComplete = (path) => {
    // path.preventDefault();
    setValues({ ...values, Picture: path });
    setUploadedImagePath(path); // Set state uploadedImagePath dengan path hasil upload
    // console.log("path handleUploadComplete ", path);
    setShowModal(false); // Tutup modal setelah berhasil mengunggah
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (values.ExpectedDate < values.IssuedDate) {
      toast.error("Due date of close should be after date of audit");
    } else if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    } else {
      console.log(values);
      setLoading(true);

      try {
        const res = await fetch(`http://10.24.7.70:8080/addgreenTAG`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          if (res.status === 403 || res.status === 401) {
            console.log("No token included");
            return;
          } else if (res.status === 404) {
            toast.error("No TAG has been used (still open)");
          }
          setLoading(false);
          console.log(res.message);
          return;
        }

        // If the greenTAG is successfully added, then send email
        const recipients = determineRecipients(values);
        if (recipients.length > 0) {
          const emailData = {
            to: recipients,
            subject: `GreenTag - ${values.TagNo} - ${values.info1} - ${values.AbnormalityType} - ${values.MaintenanceType} - ${values.Line} - ${values.ExpectedDate}`,
            body: `
              Dear All,

              Berikut laporan temuan abnormality ${
                values.AbnormalityType
              } yang terjadi di area ${values.ObservedArea}.
              Dalam rangka menjaga keberlanjutan operasional dan keselamatan lingkungan kerja, diperlukan tindak lanjut atas temuan berikut.
              
              Detail terkait temuan yang terjadi adalah sebagai berikut:
              Tag No. : ${values.TagNo}
              Tagger Name : ${values.TaggerName} 
              Sub Group : ${values.Machine}
              Issued Date : ${values.IssuedDate}
              Expected Date : ${values.ExpectedDate}
              
              Abnormality Description : ${values.AbnormalityDescription}
              
              Proposed Solution : ${values.ProposedSolution}
              
              Images :
              ${values.Picture.map((image) => image).join("\n")}

              Informasi lebih detail dapat diakses pada http://great.greenfieldsdairy.com/greentag/list
              Terima kasih atas perhatian dan kerjasamanya.


              Best Regards,
              GreenTag System`,
          };

          const resEmail = await fetch(`http://10.24.7.70:3333/send-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailData),
          });

          if (!resEmail.ok) {
            console.error("Failed to send email");
            setLoading(false);
            return;
          }
        }
        console.log(res);
        // setLoading(false);
        setTimeout(() => {
          setLoading(false);
        }, 5000);
        router.push(`/greentag/list`);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
  };

  const determineRecipients = (values) => {
    let recipients = [];
    if (
      (values.AbnormalityType === "5S" ||
        values.AbnormalityType === "Kerusakan Ringan") &&
      values.ObservedArea === "Milk Filling"
    ) {
      recipients = [
        "marjhy.maratapatriata@greenfieldsdairy.com",
        "firda.rahmatika@greenfieldsdairy.com",
      ];
    } else if (
      (values.AbnormalityType === "5S" ||
        values.AbnormalityType === "Kerusakan Ringan") &&
      values.ObservedArea === "Milk Processing"
    ) {
      recipients = [
        "marjhy.maratapatriata@greenfieldsdairy.com",
        "firda.rahmatika@greenfieldsdairy.com",
      ];
    } else if (
      values.AbnormalityType === "Safety" &&
      values.ObservedArea === "Milk Filling"
    ) {
      recipients = [
        "marjhy.maratapatriata@greenfieldsdairy.com",
        "firda.rahmatika@greenfieldsdairy.com",
      ];
    } else if (
      values.AbnormalityType === "Safety" &&
      values.ObservedArea === "Milk Processing"
    ) {
      recipients = [
        "marjhy.maratapatriata@greenfieldsdairy.com",
        "firda.rahmatika@greenfieldsdairy.com",
      ];
    } else if (
      values.AbnormalityType === "Quality" &&
      values.ObservedArea === "Milk Filling"
    ) {
      recipients = [
        "marjhy.maratapatriata@greenfieldsdairy.com",
        "firda.rahmatika@greenfieldsdairy.com",
      ];
    } else if (
      values.AbnormalityType === "Quality" &&
      values.ObservedArea === "Milk Processing"
    ) {
      recipients = [
        "marjhy.maratapatriata@greenfieldsdairy.com",
        "firda.rahmatika@greenfieldsdairy.com",
      ];
    }
    return recipients;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleInputTaggerName = (e) => {
    // const { name, value } = e.value;
    // setValues({ ...values, pic: e.value });
    // set value departement from mapping optionsDept
    const findDep = optionsDept.find(({ named }) => named == e.value);
    // console.log(findDep.dept);
    setValues({
      ...values,
      department_area: findDep.dept,
      TaggerName: e.value,
    });
  };

  const handleInputMaintenanceType = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, MaintenanceType: e.value });
  };

  const checkUser = (username) => {
    if (!username) {
      router.push(`/`);
    }
  };

  //buat modal
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  //buat modal end

  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);

  const handleInputObservedArea = (selectedOption) => {
    setSelectedArea(selectedOption);
    setSelectedLine(null); // Reset pilihan mesin saat ganti garis
    setSelectedMachine(null); // Reset pilihan mesin saat ganti garis
    setValues({ ...values, ObservedArea: selectedOption.value });
  };

  const handleLineChange = (selectedOption) => {
    setSelectedLine(selectedOption); // Memperbarui state selectedLine dengan pilihan terbaru
    // Periksa apakah untuk line yang dipilih ada satu pilihan mesin
    if (
      machines[selectedOption.value] &&
      machines[selectedOption.value].length === 1
    ) {
      const machineOption = machines[selectedOption.value][0]; // Ambil pilihan mesin yang tersedia
      setSelectedMachine(machineOption); // Set state selectedMachine dengan pilihan mesin
      // Update state values dengan Line dan Machine yang dipilih
      setValues({
        ...values,
        Machine: machineOption.value,
        Line: selectedOption.value,
      });
    } else {
      setSelectedMachine(null); // Jika lebih dari satu pilihan, reset pilihan mesin
      setValues({ ...values, Line: selectedOption.value }); // Update hanya Line di state values
    }
  };

  const handleMachineChange = (selectedOption) => {
    setSelectedMachine(selectedOption);
    setValues({ ...values, Machine: selectedOption.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const arr = [];
      try {
        await fetch("http://10.24.7.70:8080/userDept", {
          method: "GET",
        })
          .then((response) => {
            return response.json(); // return response.json() first
          })
          .then((json) => {
            const options = json.map((d) => ({
              value: d.named,
              label: d.named,
            }));
            setOptions(options);
            //console.log(options);
            //optionsDept
            const optionsDept = json.map((d) => ({
              name: d.name,
              dept: d.dept,
              section: d.section,
              named: d.named,
            }));
            setOptionsDept(optionsDept);
            // console.log(optionsDept);
          });
      } catch (err) {
        console.log("terjadi error:", err);
      }
    };
    fetchData();
    const username = getCookie("username");
    const role = getCookie("role");
    checkUser(username);
  }, []);

  const handleInputAbnormalityType = (selectedOption) => {
    const { value } = selectedOption;
    let expectedDate;

    // Mendefinisikan jumlah hari berdasarkan AbnormalityType
    switch (value) {
      case "Safety":
      case "Quality":
        expectedDate = addBusinessDays(values.IssuedDate, 3).format(
          "YYYY-MM-DD"
        );

        break;
      case "5S":
      case "Kerusakan Ringan":
        expectedDate = addBusinessDays(values.IssuedDate, 20).format(
          "YYYY-MM-DD"
        );

        break;
      default:
        expectedDate = moment(values.IssuedDate); // Jika tidak ada AbnormalityType yang dipilih, gunakan IssuedDate
    }

    setValues({
      ...values,
      AbnormalityType: value,
      ExpectedDate: expectedDate,
    });
  };

  return (
    <Layout title="Add New TAG">
      <Link href="/events">Go Back</Link>
      <h1>Add greenTAG</h1>
      <ToastContainer />
      <Modalx
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Input Tag Number
          </Typography>
          <Divider />
          <br />
          <Grid container direction="row" justifyContent="space-between">
            <form onSubmit={() => setOpen(false)} className={styles.form2}>
              <div>
                <div>
                  <label htmlFor="TagNo">Tag No</label>

                  <input
                    type="number"
                    // disabled
                    name="TagNo"
                    id="TagNo"
                    value={values.TagNo}
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
                value="Select"
                className="btn"
                variant="contained"
              />
            </form>
          </Grid>
        </Box>
      </Modalx>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            {/* <h4>#tagNumber: </h4> */}
            <label htmlFor="AbnormalityType">Tag Number</label>
            <h2> {values.TagNo} </h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
            >
              Change Tag Number
            </button>
          </div>
          <div>
            <label htmlFor="AbnormalityType">Abnormality Type</label>
            <Select
              defaultValue={values.AbnormalityType}
              name="AbnormalityType"
              id="AbnormalityType"
              onChange={handleInputAbnormalityType}
              options={optionsAbnormalityType}
            />
          </div>
          <div>
            <label htmlFor="ObservedArea">Observed Area</label>

            <Select
              defaultValue={values.ObservedArea}
              name="ObservedArea"
              id="ObservedArea"
              onChange={handleInputObservedArea}
              options={areas} // menggunakan state areas
            />
          </div>
          <div>
            <label htmlFor="Line">Group</label>

            <Select
              value={selectedLine}
              onChange={handleLineChange}
              options={selectedArea ? lines[selectedArea.value] : []}
              isDisabled={!selectedArea}
            />
          </div>
          <div>
            <label htmlFor="Machine">Machine</label>

            <Select
              value={selectedMachine}
              onChange={handleMachineChange}
              options={selectedLine ? machines[selectedLine.value] : []}
              isDisabled={!selectedLine}
            />
          </div>

          <div>
            <label htmlFor="IssuedDate">Issued Date</label>
            <input
              type="date"
              name="IssuedDate"
              id="IssuedDate"
              // min={tanggalSiji}
              // max={today}
              min={values.IssuedDate}
              max={moment().format("YYYY-MM-DD")}
              // value={values.IssuedDate || today} // Set nilai default menjadi tanggal hari ini jika IssuedDate tidak ada
              value={values.IssuedDate}
              onChange={handleInputChange}
              disabled
            ></input>
          </div>
          <div>
            <label htmlFor="ExpectedDate">Expected Date</label>
            <input
              type="date"
              name="ExpectedDate"
              id="ExpectedDate"
              min={values.IssuedDate}
              max={moment().format("YYYY-MM-DD")}
              value={values.ExpectedDate}
              // value={values.ExpectedDate || today}
              onChange={handleInputChange}
              disabled
            ></input>
          </div>

          <div>
            <label htmlFor="TaggerName">Tagger Name</label>
            <Select
              defaultValue={values.TaggerName}
              name="TaggerName"
              id="TaggerName"
              onChange={handleInputTaggerName}
              options={options}
            />
          </div>

          <div>
            <label htmlFor="MaintenanceType">Maintenance Type</label>
            <Select
              defaultValue={values.MaintenanceType}
              name="MaintenanceType"
              id="MaintenanceType"
              onChange={handleInputMaintenanceType}
              options={optionsMaintenanceType}
            />
          </div>

          <div>
            <div>{!uploadedImagePath && <p>No image uploaded</p>}</div>
            {uploadedImagePath ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
              >
                Re-Upload Image
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
              >
                Open Upload Image
              </button>
            )}
            {showModal && (
              <Modal
                show={showModal}
                onClose={handleModalClose}
                onUploadComplete={handleUploadComplete}
              >
                <UploadModal
                  onClose={handleModalClose}
                  onUploadComplete={handleUploadComplete}
                />
              </Modal>
            )}
            {uploadedImagePath &&
              uploadedImagePath.map((link, index) => (
                <Image
                  // src={uploadedImagePath}
                  src={link}
                  key={index}
                  alt="Uploaded Image"
                  width={900}
                  height={600}
                  margins={10}
                />
              ))}{" "}
            {/* Menampilkan gambar yang diunggah */}
          </div>
        </div>

        <div className={styles.grid}>
          <div>
            <label htmlFor="AbnormalityDescription">
              Abnormality Description
            </label>
            <textarea
              type="text"
              name="AbnormalityDescription"
              id="AbnormalityDescription"
              value={values.AbnormalityDescription}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="ProposedSolution">Proposed Solution</label>

            <textarea
              type="text"
              name="ProposedSolution"
              id="ProposedSolution"
              value={values.ProposedSolution}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <input
            type="submit"
            value="SUBMIT TAG"
            className="btn"
            disabled={loading}
          />
        )}
      </form>
    </Layout>
  );
}
