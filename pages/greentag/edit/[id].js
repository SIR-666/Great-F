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
import TextField from "@mui/material/TextField";

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
  { label: "Kondisi Dasar", value: "Kondisi Dasar" },
  { label: "Sulit Dijangkau SD", value: "Sulit Dijangkau SD" },
  { label: "Sumber Pengotor SP", value: "Sumber Pengotor SP" },
];

const optionsStatus = [
  { label: "Open", value: "Open" },
  { label: "Close", value: "Close" },
];

const optionsMaintenanceType = [
  // { label: "-", value: "-" },
  {
    label: "Autonomous Maintenance (by operator & teknisi)",
    value: "Autonomous Maintenance",
  },
  {
    label: "Planned Maintenance (by Engineering)",
    value: "Planned Maintenance",
  },
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

const emailOk = [
  "qhibat@gmail.com",
  "ari.isnadi@greenfieldsdairy.com",
  "rifai.santoso@greenfieldsdairy.com",
  "nur.nurkholis@greenfieldsdairy.com",
  "ruswanto@greenfieldsdairy.com",
  "firda.rahmatika@greenfieldsdairy.com",
  "marjhy@gmail.com",
]; // List of emails allowed to edit

export default function Edit() {
  const { user } = useContext(AuthContext);
  const [options, setOptions] = useState([]);
  const [optionsDept, setOptionsDept] = useState([]);
  const [loading, setLoading] = useState(false);
  let today = moment().format("YYYY-MM-DD");
  const [allowedEdit, setAllowedEdit] = useState(0);

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

  const { id } = router.query; // Access the dynamic part of the URL
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://10.24.7.70:8080/getgreenTAGid/${id}`);
      const tagData = await res.json();

      if (tagData && tagData.length > 0) {
        const tag = tagData[0]; // Assuming you're editing the first one or you filter by id
        // console.log("tagData ", tagData[0]);
        setValues({
          ...values,
          ID: id,
          TagNo: tag.TagNo,
          IssuedDate: moment(tag.IssuedDate).format("YYYY-MM-DD"),
          ExpectedDate: moment(tag.ExpectedDate).format("YYYY-MM-DD"),
          AbnormalityType: tag.AbnormalityType,
          ObservedArea: tag.ObservedArea,
          Line: tag.Line,
          Machine: tag.Machine,
          TaggerName: tag.TaggerName,
          MaintenanceType: tag.MaintenanceType,
          Picture: [tag.Picture],
          AbnormalityDescription: tag.AbnormalityDescription,
          ProposedSolution: tag.ProposedSolution,
          info1: tag.info1,
          info2: tag.info2,
        });

        // Set the selected values for dropdowns
        setSelectedArea({ label: tag.ObservedArea, value: tag.ObservedArea });
        setSelectedLine({ label: tag.Line, value: tag.Line });
        setSelectedMachine({ label: tag.Machine, value: tag.Machine });

        // Assuming tag.TaggerName is the label and value you need
        // Otherwise, adjust to match the shape { label: xxx, value: yyy }
        setTaggerName({ label: tag.TaggerName, value: tag.TaggerName });
        setAbnormalityType({
          label: tag.AbnormalityType,
          value: tag.AbnormalityType,
        });
        setMaintenanceType({
          label: tag.MaintenanceType,
          value: tag.MaintenanceType,
        });
        setStatus({ label: tag.info1, value: tag.info1 });

        // For images
        setUploadedImagePath([tag.Picture]);
      }
    };

    if (id) {
      // Make sure the id exists
      setIsLoading(true);
      fetchData();
      setIsLoading(false);
    }
    // console.log("data id ", id);
  }, [id]);

  useEffect(() => {
    // Check if user email is in the allowed list for "Planned Maintenance"

    if (user) {
      if (
        values.MaintenanceType === "Planned Maintenance" &&
        emailOk.includes(user.email)
      ) {
        setAllowedEdit(1);
      } else if (values.MaintenanceType === "Autonomous Maintenance") {
        // Allow edit for "Autonomous Maintenance" regardless of email
        setAllowedEdit(1);
      } else {
        // Set not allowed if none of the conditions are met
        setAllowedEdit(0);
      }
    } else {
      // Handle scenario when user is null, perhaps default to not allowed
      setAllowedEdit(0);
    }
  }, [user, values]); // D

  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No data found</p>;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://10.24.7.70:8080/getgreenTAGarea");
      const data = await response.json();
      // console.log("data ", data);

      const areasData = [...new Set(data.map((item) => item.observedArea))].map(
        (area) => ({ value: area, label: area })
      );

      setAreas(areasData);
      // console.log("areasData ", areasData);

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
    setShowModal(false);
    // setShowModal(path);
    // console.log("path handleModalClose ", path);
  };
  const handleUploadComplete = (path) => {
    setValues({ ...values, Picture: path });
    setUploadedImagePath(path); // Set state uploadedImagePath dengan path hasil upload
    // console.log("path handleUploadComplete ", path);
    setShowModal(false); // Tutup modal setelah berhasil mengunggah
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("values ", values);
    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (values.ExpectedDate < values.IssuedDate) {
      toast.error("Due date of close should be after date of audit");
    } else if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    } else {
      console.log("edit data ", values);
      setLoading(true);

      //ganti jadi edit
      try {
        const res = await fetch(`http://10.24.7.70:8080/editgreenTAG`, {
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
            toast.error("Edit data gagal, periksa kembali koneksi VPN anda");
          }
          setLoading(false);
          console.log(res.message);
          return;
        }

        // If the greenTAG is successfully added, then send email
        // const recipients = determineRecipients(values);
        const recipients = await determineRecipients(values); // Menunggu janji diselesaikan

        // console.log("recipients 1 ", recipients);
        // console.log("value ", values.Picture);

        if (recipients.length > 0) {
          const emailData = {
            to: recipients,
            subject: `Update GreenTag - ${values.TagNo} - ${values.info1} - ${values.AbnormalityType} - ${values.MaintenanceType} - ${values.Line} - ${values.ExpectedDate}`,
            body: `
              Dear All,

              Berikut Update laporan temuan abnormality ${
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
          } else {
            console.log("Email sent successfully", resEmail);
          }
        }
        console.log("respone email", res);
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

  // Buat fungsi untuk mengambil data dari API
  const fetchEmailsFromAPI = async () => {
    try {
      const response = await fetch("http://10.24.7.70:8080/getgreenTAGemail");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching emails:", error);
      return [];
    }
  };

  const determineRecipientsManual = (values) => {
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

  const determineRecipients = async (values) => {
    try {
      const emails = await fetchEmailsFromAPI();
      // console.log("emails ", emails);
      // console.log("values.AbnormalityType ", values.AbnormalityType);

      // Gunakan data dari API untuk menentukan penerima
      const recipients = emails
        .filter((emailData) => {
          return (
            emailData.abnormalityType === values.AbnormalityType &&
            emailData.groupArea === values.ObservedArea
          );
        })
        .map((emailData) => {
          // console.log("emailData ", emailData);
          // console.log("emailData email ", emailData.email);
          return emailData.email;
        });

      // Tambahkan email pengguna ke dalam recipients
      recipients.push(user.email);
      console.log("sender email ", values.info2);
      recipients.push(values.info2);

      console.log("sender email ", user.email);
      console.log("recipients email ", recipients);
      return recipients;
    } catch (error) {
      console.error("Error determining recipients:", error);
      return [];
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleInputTaggerNamex = (e) => {
    const findDep = optionsDept.find(({ named }) => named == e.value);
    console.log(findDep.dept);
    console.log(e.value);
    setValues({
      ...values,
      department_area: findDep.dept,
      TaggerName: e.value,
    });
  };

  const handleInputTaggerName = (selectedOption) => {
    if (selectedOption) {
      const findDep = optionsDept.find(
        ({ named }) => named === selectedOption.value
      );
      setValues((prevValues) => ({
        ...prevValues,
        department_area: findDep ? findDep.dept : "",
        TaggerName: selectedOption.value,
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        department_area: "",
        TaggerName: "",
      }));
    }
  };

  const handleInputStatus = (selectedOption) => {
    // const { name, value } = e.value;
    // console.log("e.value.status ", e.value);
    // setValues({ ...values, info1: e.value });
    setValues({ ...values, info1: selectedOption.value });
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
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  //buat modal end

  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [taggerName, setTaggerName] = useState(null);
  const [AbnormalityType, setAbnormalityType] = useState(null);
  const [MaintenanceType, setMaintenanceType] = useState(null);
  const [status, setStatus] = useState(null);

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
    <Layout title="Edit TAG">
      <Link href="/greentag/list">Go Back</Link>
      <h1>Edit greenTAG</h1>
      <ToastContainer />
      <Modalx
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Tag Number
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
          </div>

          <div>
            <label htmlFor="info1">Status</label>
            {allowedEdit ? (
              <>
                {" "}
                <Select
                  // defaultValue={values.info1}
                  value={optionsStatus.find(
                    (option) => option.value === values.info1
                  )} // Ensure the selected value matches one of the options
                  name="info1"
                  id="info1"
                  onChange={handleInputStatus}
                  options={optionsStatus}
                />
              </>
            ) : (
              <TextField
                disabled
                fullWidth // This makes the TextField take the full width of its container
                id="outlined-disabled"
                // label="Disabled"
                value={values.info1}
              />
            )}
          </div>

          <div>
            <label htmlFor="AbnormalityType">Abnormality Type</label>
            {/* <TextField
              disabled
              fullWidth // This makes the TextField take the full width of its container
              id="outlined-disabled"
              // label="Disabled"
              value={values.AbnormalityType}
            /> */}
            <Select
              // defaultValue={values.AbnormalityType}
              // value={AbnormalityType}
              value={optionsAbnormalityType.find(
                (option) => option.value === values.AbnormalityType
              )}
              name="AbnormalityType"
              id="AbnormalityType"
              onChange={handleInputAbnormalityType}
              options={optionsAbnormalityType}
              isOptionDisabled={(option) => option.isdisabled} // disable an option
            />
          </div>
          <div>
            <label htmlFor="ObservedArea">Observed Area</label>
            <TextField
              disabled
              fullWidth // This makes the TextField take the full width of its container
              id="outlined-disabled"
              // label="Disabled"
              value={values.ObservedArea}
            />
            {/* <Select
              defaultValue={values.ObservedArea}
              value={selectedArea}
              name="ObservedArea"
              id="ObservedArea"
              onChange={handleInputObservedArea}
              options={areas} // menggunakan state areas
              isOptionDisabled={(option) => option.isdisabled} // disable an option
            /> */}
          </div>
          <div>
            <label htmlFor="Line">Group</label>

            <TextField
              disabled
              fullWidth // This makes the TextField take the full width of its container
              id="outlined-disabled"
              // label="Disabled"
              value={values.Line}
            />

            {/* <Select
              defaultValue={values.Line}
              value={selectedLine}
              onChange={handleLineChange}
              options={selectedArea ? lines[selectedArea.value] : []}
              isDisabled={!selectedArea}
              isOptionDisabled={(option) => option.isdisabled} // disable an option
            /> */}
          </div>
          <div>
            <label htmlFor="Machine">Machine</label>
            <TextField
              disabled
              fullWidth // This makes the TextField take the full width of its container
              id="outlined-disabled"
              // label="Disabled"
              value={values.Machine}
            />
            {/* 
            <Select
              value={selectedMachine}
              onChange={handleMachineChange}
              options={selectedLine ? machines[selectedLine.value] : []}
              isDisabled={!selectedLine}
              isOptionDisabled={(option) => option.isdisabled} // disable an option
            /> */}
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
            <TextField
              disabled
              fullWidth // This makes the TextField take the full width of its container
              id="outlined-disabled"
              // label="Disabled"
              value={values.TaggerName}
            />
            {/* 
            <Select
              value={
                options.find((option) => option.value === values.TaggerName) ||
                null
              }
              name="TaggerName"
              id="TaggerName"
              onChange={handleInputTaggerName}
              options={options}
              isOptionDisabled={(option) => option.isdisabled} // disable an option
            /> */}
          </div>

          <div>
            <label htmlFor="MaintenanceType">Maintenance Type</label>
            {/* <TextField
              disabled
              fullWidth // This makes the TextField take the full width of its container
              id="outlined-disabled"
              // label="Disabled"
              value={values.MaintenanceType}
            /> */}
            <Select
              // defaultValue={values.MaintenanceType}
              // value={MaintenanceType}
              value={optionsMaintenanceType.find(
                (option) => option.value === values.MaintenanceType
              )}
              name="MaintenanceType"
              id="MaintenanceType"
              onChange={handleInputMaintenanceType}
              options={optionsMaintenanceType}
              isOptionDisabled={(option) => option.isdisabled} // disable an option
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
